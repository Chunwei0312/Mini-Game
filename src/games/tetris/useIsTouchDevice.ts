import { useEffect, useState } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(pointer: coarse)");

    const compute = () => {
      const coarse = mq?.matches ?? false;
      const touchPoints = navigator.maxTouchPoints ?? 0;
      setIsTouch(coarse || touchPoints > 0);
    };

    compute();
    mq?.addEventListener?.("change", compute);

    return () => {
      mq?.removeEventListener?.("change", compute);
    };
  }, []);

  return isTouch;
}
