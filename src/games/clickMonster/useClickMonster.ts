import { useEffect, useState } from "react";
import type { Position, GameState } from "./types";

export function useClickMonster() {
  const [state, setState] = useState<GameState>({
    score: 0,
    timeLeft: 30,
    playing: false,
  });

  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });

  // 倒數計時
  useEffect(() => {
    if (!state.playing) return;
    if (state.timeLeft <= 0) {
      setState(s => ({ ...s, playing: false }));
      return;
    }

    const timer = setInterval(() => {
      setState(s => ({ ...s, timeLeft: s.timeLeft - 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [state.playing, state.timeLeft]);

  // 怪物移動
  useEffect(() => {
    if (!state.playing) return;

    const move = setInterval(() => {
      setPosition({
        x: Math.random() * 80,
        y: Math.random() * 80,
      });
    }, 800);

    return () => clearInterval(move);
  }, [state.playing]);

  const startGame = () => {
    setState({ score: 0, timeLeft: 30, playing: true });
  };

  const hitMonster = () => {
    if (!state.playing) return;
    setState(s => ({ ...s, score: s.score + 1 }));
  };

  return {
    state,
    position,
    startGame,
    hitMonster,
  };
}
