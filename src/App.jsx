import React, { useState } from "react";
import HomeScreen from "./HomeScreen";
import TradingGame from "./TradingGame";

export default function App() {
  const [started, setStarted] = useState(false);
  const [lastScore, setLastScore] = useState(null);

  const handleGameEnd = (score, playerName) => {
    setLastScore(score);
    setStarted(false); // Go back to home screen
  };

  return (
    <div>
      {!started ? (
        <HomeScreen onStart={() => setStarted(true)} />
      ) : (
        <TradingGame onGameEnd={handleGameEnd} playerName="Player1" />
      )}
    </div>
  );
}
