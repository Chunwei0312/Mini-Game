import type { Board, Piece } from "./types";

const COLORS: Record<number, string> = {
    1: "#22d3ee", // cyan
    2: "#facc15", // yellow
    3: "#c084fc", // purple
    4: "#fb923c", // orange
    5: "#60a5fa", // blue
};

export function BoardView({ board, current }: { board: Board; current: Piece }) {
    const temp = board.map((r) => [...r]);

    current.shape.forEach((row, y) =>
        row.forEach((cell, x) => {
            const by = current.y + y;
            const bx = current.x + x;
            if (!cell) return;
            if (by < 0 || by >= temp.length) return;
            if (bx < 0 || bx >= temp[0].length) return;
            temp[by][bx] = current.color;
        })
    );

    return (
        <div>
            {temp.map((row, y) => (
                <div key={y} style={{ display: "flex" }}>
                    {row.map((c, x) => (
                        <div
                            key={x}
                            style={{
                                width: 20,
                                height: 20,
                                border: "1px solid #e5e7eb",
                                background: c ? COLORS[c] : "#ffffff",
                                boxSizing: "border-box",
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
