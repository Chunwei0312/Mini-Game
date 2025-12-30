import { useEffect, useState } from "react";
})
);
return newBoard;
};


const clearLines = (b: Board): Board => {
const filtered = b.filter(r => r.some(c => c === 0));
const cleared = ROWS - filtered.length;
return [
...Array.from({ length: cleared }, () => Array(COLS).fill(0)),
...filtered,
];
};


const drop = () => {
if (!collision(current, 0, 1)) {
setCurrent(p => ({ ...p, y: p.y + 1 }));
} else {
const merged = clearLines(merge(current, board));
setBoard(merged);
const next = randomPiece();
if (collision(next)) {
setGameOver(true);
setRunning(false);
}
setCurrent(next);
}
};


const hardDrop = () => {
let y = current.y;
while (!collision(current, 0, y - current.y + 1)) y++;
const landed = { ...current, y };
setBoard(clearLines(merge(landed, board)));
setCurrent(randomPiece());
};


useEffect(() => {
if (!running) return;
const t = setInterval(drop, 500);
return () => clearInterval(t);
}, [running, current, board]);


const startGame = () => {
setBoard(createBoard());
setCurrent(randomPiece());
setGameOver(false);
setRunning(true);
};


return {
board,
current,
running,
gameOver,
startGame,
hardDrop,
rotate,
setCurrent,
};
}