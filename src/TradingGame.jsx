import React, { useState, useEffect } from "react";
import "./TradingGame.css"; // we'll write some CSS for styling

export default function TradingGame({ onGameEnd, playerName }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [balance, setBalance] = useState(1000); // Starting balance
  const [shares, setShares] = useState(0);
  const [price, setPrice] = useState(10); // Start price
  const [gameOver, setGameOver] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Random share price updates
  useEffect(() => {
    let active = true;

    const updatePrice = () => {
      if (!active || timeLeft <= 0) return;

      const change = Math.floor(Math.random() * 201) - 100;
      setPrice((prev) => {
        let newPrice = prev + change;
        if (newPrice < 10) newPrice = 10;
        if (newPrice > 2000) newPrice = 2000;
        return newPrice;
      });

      const nextInterval = Math.random() * 1500 + 200;
      setTimeout(updatePrice, nextInterval);
    };

    updatePrice();
    return () => {
      active = false;
    };
  }, [timeLeft]);

  // Buy/Sell functions
  const buyShare = () => {
    if (balance >= price) {
      setBalance(balance - price);
      setShares(shares + 1);
    }
  };

  const sellShare = () => {
    if (shares > 0) {
      setBalance(balance + price);
      setShares(shares - 1);
    }
  };

  const sellAllShares = () => {
    if (shares > 0) {
      setBalance(balance + shares * price);
      setShares(0);
    }
  };

  const totalNetWorth = balance + shares * price;

  const getRewardMB = (score) => {
    if (score <= 3000) return "100 MB";
    if (score <= 7000) return "200 MB";
    if (score <= 15000) return "300 MB";
    if (score <= 20000) return "400 MB";
    if (score <= 24000) return "500 MB";
    if (score <= 28000) return "600 MB";
    if (score <= 30000) return "700 MB";
    if (score <= 35000) return "800 MB";
    if (score <= 40000) return "900 MB";
    if (score <= 50000) return "1000 MB";
    return "1000+ MB 🚀";
  };

 // fallback for higher scores

  const handleClosePopup = () => {
    setGameOver(false);
    onGameEnd(totalNetWorth, playerName);
  };

  return (
    <div className="game-container">
      <h2 className="timer">⏳ {timeLeft}s</h2>
      <h3 className="price">📈 Share Price: R{price}</h3>

      <div className="row">
        <p className="info">💰 Balance: R{balance}</p>
        <p className="info">📦 Shares: {shares}</p>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <div className="row">
          <div className="button-column">
            <button className="green-btn" onClick={buyShare} disabled={timeLeft <= 0}>
              Buy 1
            </button>
          </div>
          <div className="divider"></div>
          <div className="button-column">
            <button className="red-btn" onClick={sellShare} disabled={timeLeft <= 0}>
              Sell 1
            </button>
            <button className="red-btn" onClick={sellAllShares} disabled={timeLeft <= 0}>
              Sell All
            </button>
          </div>
        </div>
      </div>

      {/* End Game Modal */}
      {gameOver && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Game Over!</h2>
            <p>Last Share Price: R{price}</p>
            <p>Shares Remaining: {shares}</p>
            <p>Cash Balance: R{balance}</p>
            <p>Total Net Worth: R{totalNetWorth}</p>
            <p className="reward">🎉 You won {getRewardMB(totalNetWorth)}!</p>

            <button className="close-btn" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
