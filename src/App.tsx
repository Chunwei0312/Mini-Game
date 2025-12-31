import { useState } from "react";
import GameHub from "./pages/GameHub";
import TetrisGame from "./games/tetris/TetrisGame";
import ClickMonsterGame from "./games/clickMonster/ClickMonsterGame";

type Page = "hub" | "tetris" | "click";

export default function App() {
  const [page, setPage] = useState<Page>("hub");

  if (page === "tetris") {
    return <TetrisGame onBack={() => setPage("hub")} />;
  }

  if (page === "click") {
    return <ClickMonsterGame onBack={() => setPage("hub")} />;
  }

  return <GameHub onSelect={setPage} />;
}
