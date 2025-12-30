import { useClickMonster } from "./useClickMonster";

export default function ClickMonsterGame() {
    const { state, position, startGame, hitMonster } = useClickMonster();

    return (
        <div>
            <h1>點擊怪物</h1>
            <div>分數：{state.score}</div>
            <div>時間：{state.timeLeft}</div>

            <div style={{ position: "relative", width: 300, height: 300 }}>
                {state.playing && (
                    <button
                        onClick={hitMonster}
                        style={{
                            position: "absolute",
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                        }}
                    >
                        怪
                    </button>
                )}
            </div>

            <button onClick={startGame}>
                {state.playing ? "重新開始" : "開始"}
            </button>
        </div>
    );
}
