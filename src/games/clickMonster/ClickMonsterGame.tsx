import { useClickMonster } from "./useClickMonster";

type Props = {
    onBack: () => void;
};

export default function ClickMonsterGame({ onBack }: Props) {
    const { state, position, startGame, hitMonster } = useClickMonster();

    return (
        <div className="p-4">
            {/* 回主畫面 */}
            <div className="mb-3">
                <button
                    className="px-3 py-1 rounded-lg border border-slate-300
                     text-slate-700 hover:bg-slate-100"
                    onClick={onBack}
                >
                    ← 回主畫面
                </button>
            </div>

            <h1 className="text-xl font-bold mb-2">點擊怪物</h1>

            <div className="mb-2">分數：{state.score}</div>
            <div className="mb-4">時間：{state.timeLeft}</div>

            <div
                className="relative border w-[300px] h-[300px] mx-auto mb-4"
            >
                {state.playing && (
                    <button
                        onClick={hitMonster}
                        className="absolute bg-red-500 text-white px-2 py-1 rounded"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                        }}
                    >
                        怪
                    </button>
                )}
            </div>

            <button
                className="px-4 py-2 bg-slate-900 text-white rounded-xl"
                onClick={startGame}
            >
                {state.playing ? "重新開始" : "開始"}
            </button>
        </div>
    );
}
