import { useEffect } from "react";
import { useTetris } from "./useTetris";
import { BoardView } from "./BoardView";


export default function TetrisGame() {
    const {
        board,
        current,
        running,
        gameOver,
        startGame,
        hardDrop,
        rotate,
        setCurrent,
    } = useTetris();


    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!running) return;
            if (e.key === "ArrowLeft") setCurrent(p => ({ ...p, x: p.x - 1 }));
            if (e.key === "ArrowRight") setCurrent(p => ({ ...p, x: p.x + 1 }));
            if (e.key === "ArrowUp") setCurrent(p => ({ ...p, shape: rotate(p.shape) }));
            if (e.key === " ") hardDrop();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [running]);


    return (
        <div>
            <h1>俄羅斯方塊</h1>
            {gameOver && <div>Game Over</div>}
            <BoardView board={board} current={current} />
            <button onClick={startGame}>{running ? "重新開始" : "開始"}</button>
        </div>
    );
}