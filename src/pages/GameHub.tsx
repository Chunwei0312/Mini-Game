import { useState } from "react";
import { games } from "../games";


type GameKey = keyof typeof games;


export default function GameHub() {
    const [currentGame, setCurrentGame] = useState<GameKey | null>(null);


    if (currentGame) {
        const GameComponent = games[currentGame];
        return (
            <div>
                <button onClick={() => setCurrentGame(null)}>← 返回選單</button>
                <GameComponent />
            </div>
        );
    }


    return (
        <div>
            <h1>🎮 React 小遊戲中心</h1>
            {Object.keys(games).map((key) => (
                <button key={key} onClick={() => setCurrentGame(key as GameKey)}>
                    {key}
                </button>
            ))}
        </div>
    );
}