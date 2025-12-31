import { useEffect, useRef } from "react";
import { BoardView } from "./BoardView";
import { useTetris } from "./useTetris";
import type { Piece } from "./types";
import TetrisControls from "./TetrisControls";
import { useIsTouchDevice } from "./useIsTouchDevice";

type Props = {
    onBack: () => void;
};

const COLOR_HEX: Record<number, string> = {
    1: "#22d3ee",
    2: "#facc15",
    3: "#c084fc",
    4: "#fb923c",
    5: "#60a5fa",
};

function NextView({ piece }: { piece: Piece }) {
    const cellSize = 14;

    return (
        <div className="border border-slate-200 rounded-xl p-3 bg-white w-40 shadow-sm">
            <div className="font-semibold text-slate-700 mb-2 text-left">Next</div>

            <div className="inline-block">
                {piece.shape.map((row, y) => (
                    <div key={y} style={{ display: "flex" }}>
                        {row.map((cell, x) => (
                            <div
                                key={x}
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    border: "1px solid #e5e7eb",
                                    background: cell ? (COLOR_HEX[piece.color] ?? "#93c5fd") : "transparent",
                                    boxSizing: "border-box",
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TetrisGame({ onBack }: Props) {
    const isTouch = useIsTouchDevice();

    const {
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
        rotateShape,
        setCurrent,
        collision,
    } = useTetris();

    // --- 共用操作（鍵盤 / 手機按鈕 / 手勢共用） ---
    const moveLeft = () => {
        if (!running) return;
        const np = { ...current, x: current.x - 1 };
        if (!collision(np)) setCurrent((p) => ({ ...p, x: p.x - 1 }));
    };

    const moveRight = () => {
        if (!running) return;
        const np = { ...current, x: current.x + 1 };
        if (!collision(np)) setCurrent((p) => ({ ...p, x: p.x + 1 }));
    };

    const doRotate = () => {
        if (!running) return;
        const r = rotateShape(current.shape);
        if (!collision(current, 0, 0, r)) setCurrent((p) => ({ ...p, shape: r }));
    };

    // --- 鍵盤控制（桌機） ---
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!running) return;

            if (e.key === "ArrowLeft") moveLeft();
            if (e.key === "ArrowRight") moveRight();
            if (e.key === "ArrowUp") doRotate();

            // 下鍵：直接到底
            if (e.key === "ArrowDown") {
                e.preventDefault();
                hardDrop();
            }

            // 空白鍵：交換 Next
            if (e.key === " ") {
                e.preventDefault();
                swapWithNext();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [running, current]);

    // --- 手勢（手機） ---
    const touchRef = useRef<{ x: number; y: number } | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touchRef.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        const start = touchRef.current;
        if (!start || !running) return;

        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;

        const TH = 25; // 門檻避免誤觸

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > TH) moveRight();
            else if (dx < -TH) moveLeft();
        } else {
            if (dy > TH) hardDrop(); // 下滑：到底
            else if (dy < -TH) doRotate(); // 上滑：旋轉
        }

        touchRef.current = null;
    };

    // 顯示規則：遊戲中或 GameOver 都顯示「重新開始」
    const showRestart = running || gameOver;

    return (
        <div className="p-4">
            {/* 回主畫面 */}
            <div className="flex justify-start mb-3">
                <button
                    className="px-3 py-1 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                    onClick={onBack}
                >
                    ← 回主畫面
                </button>
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 m-0">俄羅斯方塊</h1>

                <div className="flex justify-center gap-4 mt-2 font-semibold text-slate-700">
                    <div>Score: {score}</div>
                    <div>Lines: {lines}</div>
                    <div>Level: {level}</div>
                </div>

                {gameOver && <div className="mt-2 font-bold text-red-600">Game Over</div>}

                <div className="mt-4">
                    {/* ===== 棋盤舞台（只放棋盤與 Next，不放主按鈕） ===== */}
                    <div
                        className="relative w-fit mx-auto"
                        style={{ touchAction: "manipulation" }}
                        onTouchStart={isTouch ? onTouchStart : undefined}
                        onTouchEnd={isTouch ? onTouchEnd : undefined}
                    >
                        {/* 桌機：Next 貼右上，不推擠棋盤 */}
                        <div className="hidden sm:block absolute top-0 left-full ml-4">
                            <NextView piece={nextPiece} />
                        </div>

                        <div className="bg-white rounded-xl shadow p-4">
                            <BoardView board={board} current={current} />
                        </div>

                        {/* 手機：Next 放棋盤下方避免橫向擠版 */}
                        <div className="block sm:hidden mt-3">
                            <div className="mx-auto w-fit">
                                <NextView piece={nextPiece} />
                            </div>
                        </div>
                    </div>

                    {/* ===== 主按鈕：移出舞台外，避免被 absolute / w-fit 影響；文字強制白色 ===== */}
                    <div className="flex justify-center mt-4">
                        <button
                            className="px-5 py-2 rounded-xl bg-slate-900 !text-white font-semibold
                         hover:bg-slate-800 active:scale-[0.98]"
                            onClick={showRestart ? resetGame : startGame}
                        >
                            {showRestart ? "重新開始" : "開始"}
                        </button>
                    </div>

                    {/* 控制提示/面板：手機顯示螢幕控制，桌機顯示鍵盤提示 */}
                    {isTouch ? (
                        <TetrisControls
                            disabled={!running}
                            onLeft={moveLeft}
                            onRight={moveRight}
                            onRotate={doRotate}
                            onDown={hardDrop}
                            onSwap={swapWithNext}
                        />
                    ) : (
                        <div className="mt-3 text-sm text-slate-500">
                            鍵盤：左右移動、上旋轉、下到底、空白交換
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
