import React from "react";

export default function HomeScreen({ onStart }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📈 Trading Game</h1>
      <p style={styles.text}>
        Welcome to the Trading Game! 🎮 <br />
        Buy shares when prices are low, sell them when prices are high, 
        and maximize your net worth before the timer runs out.
      </p>
      <p style={styles.text}>
        💰 Start with R1000 <br />
        ⏳ You have 30 seconds <br />
        🏆 Earn MB rewards based on your final score!
      </p>
      <button style={styles.button} onClick={onStart}>
        Start Game 🚀
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "beige",
    minHeight: "100vh",
    color: "black",
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "20px",
    margin: "10px 0",
  },
  button: {
    marginTop: "30px",
    padding: "15px 30px",
    fontSize: "22px",
    fontWeight: "bold",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "green",
    color: "white",
    cursor: "pointer",
  },
};
