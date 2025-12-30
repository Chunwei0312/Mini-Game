import { Board, Piece } from "./types";


const COLORS: Record<number, string> = {
    1: "bg-cyan-400",
    2: "bg-yellow-400",
    3: "bg-purple-400",
    4: "bg-orange-400",
    5: "bg-blue-400",
};


export function BoardView({ board, current }: { board: Board; current: Piece }) {
    const temp = board.map(r => [...r]);
    current.shape.forEach((row, y) =>
        row.forEach((cell, x) => {
            if (cell && current.y + y >= 0)
                temp[current.y + y][current.x + x] = current.color;
        })
    );


    return (
        <div>
            {temp.map((row, y) => (
                <div key={y} className="flex">
                    {row.map((c, x) => (
                        <div
                            key={x}
                            className={`w-5 h-5 border ${c ? COLORS[c] : "bg-white"}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}