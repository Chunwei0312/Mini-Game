import { useEffect, useMemo, useRef, useState } from "react";
import type { Board, Piece } from "./types";

const ROWS = 20;
const COLS = 10;

const createBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const rotateShape = (shape: number[][]) =>
  shape[0].map((_, i) => shape.map((row) => row[i]).reverse());

const PIECES: Array<{ shape: number[][]; color: number }> = [
  { shape: [[1, 1], [1, 1]], color: 2 }, // O
  { shape: [[1, 1, 1, 1]], color: 1 }, // I
  { shape: [[0, 1, 0], [1, 1, 1]], color: 3 }, // T
  { shape: [[1, 0, 0], [1, 1, 1]], color: 4 }, // J/L
  { shape: [[0, 0, 1], [1, 1, 1]], color: 5 }, // L/J
];

const spawnX = (shape: number[][]) => {
  const w = shape[0]?.length ?? 0;
  return Math.floor(COLS / 2) - Math.ceil(w / 2);
};

const spawnPiece = (p: Omit<Piece, "x" | "y">): Piece => ({
  ...p,
  x: spawnX(p.shape),
  y: -1,
});

const cloneShape = (s: number[][]) => s.map((r) => [...r]);

const randomPiece = (): Piece => {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  return {
    shape: cloneShape(p.shape),
    x: spawnX(p.shape),
    y: -1,
    color: p.color,
  };
};

const collision = (board: Board, piece: Piece, dx = 0, dy = 0, shapeOverride?: number[][]) => {
  const shape = shapeOverride ?? piece.shape;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (!shape[y][x]) continue;

      const nx = piece.x + x + dx;
      const ny = piece.y + y + dy;

      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx] !== 0) return true;
    }
  }
  return false;
};

const merge = (board: Board, piece: Piece): Board => {
  const newBoard = board.map((row) => [...row]);
  piece.shape.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (!cell) return;
      const by = piece.y + y;
      const bx = piece.x + x;
      if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
        newBoard[by][bx] = piece.color;
      }
    })
  );
  return newBoard;
};

const clearLines = (b: Board): { board: Board; cleared: number } => {
  const filtered = b.filter((row) => row.some((cell) => cell === 0));
  const cleared = ROWS - filtered.length;
  const newBoard: Board = [
    ...Array.from({ length: cleared }, () => Array(COLS).fill(0)),
    ...filtered,
  ];
  return { board: newBoard, cleared };
};

const scoreForCleared = (cleared: number) => {
  // 加權：一次消越多分越高
  if (cleared === 1) return 100;
  if (cleared === 2) return 300;
  if (cleared === 3) return 500;
  if (cleared >= 4) return 800;
  return 0;
};

export function useTetris() {
  const [board, setBoard] = useState<Board>(() => createBoard());
  const [current, setCurrent] = useState<Piece>(() => randomPiece());
  const [nextPiece, setNextPiece] = useState<Piece>(() => randomPiece());

  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const level = Math.floor(lines / 10) + 1;

  const [tickMs, setTickMs] = useState(500);

  // refs（效能重構核心）
  const boardRef = useRef(board);
  const currentRef = useRef(current);
  const nextRef = useRef(nextPiece);
  const runningRef = useRef(running);

  // 同步 refs（state -> ref）
  useEffect(() => void (boardRef.current = board), [board]);
  useEffect(() => void (currentRef.current = current), [current]);
  useEffect(() => void (nextRef.current = nextPiece), [nextPiece]);
  useEffect(() => void (runningRef.current = running), [running]);

  // 等級加速
  useEffect(() => {
    const nextTick = Math.max(120, 500 - (level - 1) * 50);
    setTickMs(nextTick);
  }, [level]);

  const rotateShapeFn = useMemo(() => rotateShape, []);

  const resetGame = () => {
    const b = createBoard();
    const c = randomPiece();
    const n = randomPiece();

    setBoard(b);
    setCurrent(c);
    setNextPiece(n);

    setScore(0);
    setLines(0);
    setGameOver(false);
    setRunning(false);
  };

  const startGame = () => {
    const b = createBoard();
    const c = randomPiece();
    const n = randomPiece();

    setBoard(b);
    setCurrent(c);
    setNextPiece(n);

    setScore(0);
    setLines(0);
    setGameOver(false);
    setRunning(true);
  };

  const lockAndSpawn = (landed: Piece) => {
    const b0 = boardRef.current;
    const merged = merge(b0, landed);
    const { board: clearedBoard, cleared } = clearLines(merged);

    if (cleared > 0) {
      setLines((l) => l + cleared);
      setScore((s) => s + scoreForCleared(cleared) * level);
    }

    const next = nextRef.current;
    const spawned = spawnPiece({ shape: cloneShape(next.shape), color: next.color });
    const newNext = randomPiece();

    // game over 檢查（spawn 時撞到）
    if (collision(clearedBoard, spawned, 0, 0, spawned.shape)) {
      setBoard(clearedBoard);
      setGameOver(true);
      setRunning(false);
      return;
    }

    setBoard(clearedBoard);
    setCurrent(spawned);
    setNextPiece(newNext);
  };

  const dropOne = () => {
    if (!runningRef.current) return;

    const b = boardRef.current;
    const c = currentRef.current;

    if (!collision(b, c, 0, 1)) {
      setCurrent((p) => ({ ...p, y: p.y + 1 }));
    } else {
      lockAndSpawn(c);
    }
  };

  const hardDrop = () => {
    if (!runningRef.current) return;

    const b = boardRef.current;
    const c = currentRef.current;

    let y = c.y;
    while (!collision(b, { ...c, y }, 0, 1)) y++;
    lockAndSpawn({ ...c, y });
  };

  const swapWithNext = () => {
    if (!runningRef.current) return;

    const b = boardRef.current;
    const c = currentRef.current;
    const n = nextRef.current;

    const newCurrent = spawnPiece({ shape: cloneShape(n.shape), color: n.color });
    if (collision(b, newCurrent, 0, 0, newCurrent.shape)) return;

    const newNext: Piece = { ...c, x: spawnX(c.shape), y: -1 };
    setCurrent(newCurrent);
    setNextPiece(newNext);
  };

  // interval：只依賴 running/tickMs（不依賴 board/current）
  useEffect(() => {
    if (!running) return;
    const id = setInterval(dropOne, tickMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, tickMs]);

  return {
    board,
    current,
    nextPiece,
    running,
    gameOver,
    score,
    lines,
    level,

    startGame,
    resetGame,

    hardDrop,
    swapWithNext,

    rotateShape: rotateShapeFn,
    setCurrent, // 讓 UI 控制左右移動/旋轉
    collision: (p: Piece, dx = 0, dy = 0, shape?: number[][]) =>
      collision(boardRef.current, p, dx, dy, shape),
  };
}
