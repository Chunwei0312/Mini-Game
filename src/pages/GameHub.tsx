import Centered from "../components/Centered";

type Props = {
    onSelect: (page: "tetris" | "click") => void;
};

export default function GameHub({ onSelect }: Props) {
    return (
        <Centered>
            <div className="bg-white rounded-2xl shadow p-8 w-[320px] max-w-[90vw] text-center">
                <h1 className="text-2xl font-bold mb-6 text-slate-800">
                    Mini Game
                </h1>

                <div className="flex flex-col gap-4">
                    <button
                        className="px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold
                       hover:bg-slate-800 active:scale-[0.98]"
                        onClick={() => onSelect("tetris")}
                    >
                        Tetris
                    </button>

                    <button
                        className="px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold
                       hover:bg-slate-800 active:scale-[0.98]"
                        onClick={() => onSelect("click")}
                    >
                        Click Monster
                    </button>
                </div>
            </div>
        </Centered>
    );
}
