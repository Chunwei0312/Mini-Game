type Props = {
    disabled?: boolean;
    onLeft: () => void;
    onRight: () => void;
    onRotate: () => void;
    onDown: () => void; // hard drop
    onSwap: () => void; // swap with next
};

export default function TetrisControls({
    disabled,
    onLeft,
    onRight,
    onRotate,
    onDown,
    onSwap,
}: Props) {
    const btnBase =
        "w-14 h-14 rounded-xl border border-slate-200 bg-white font-semibold active:scale-[0.98] disabled:opacity-50";

    return (
        <div className="mt-4">
            <div className="flex justify-center gap-3 flex-wrap">
                <button className={btnBase} onClick={onRotate} disabled={disabled}>
                    旋轉
                </button>
                <button className={btnBase} onClick={onSwap} disabled={disabled}>
                    交換
                </button>
            </div>

            <div className="flex justify-center gap-3 mt-3">
                <button className={btnBase} onClick={onLeft} disabled={disabled}>
                    ◀
                </button>
                <button className={btnBase} onClick={onDown} disabled={disabled}>
                    ▼
                </button>
                <button className={btnBase} onClick={onRight} disabled={disabled}>
                    ▶
                </button>
            </div>

            <div className="text-center text-xs text-slate-500 mt-2">
                手機：點按或滑動（左/右移動，上滑旋轉，下滑到底）
            </div>
        </div>
    );
}
