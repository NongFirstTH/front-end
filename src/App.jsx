import React, { useState } from "react";
import "./forApp.css";

function App({ onBack }) {
  const [players, setPlayers] = useState([]);

  const handleCharacterCreation = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;

    if (!name) {
      alert("Please enter a name for your character.");
      return;
    }

    const existingPlayer = players.find((player) => player.name === name);

    if (existingPlayer) {
      alert("This name is already taken. Please choose a different name.");
    } else {
      const newPlayer = { id: Date.now(), name };
      setPlayers([...players, newPlayer]);
    }
  };

  return (
    <div className="app-container h-screen bg-[#070F2B] flex flex-col justify-between">
      <div className="centered-image">
        <img src="/img/upbeat_logo.png" alt="Game" className="mb-8" />
      </div>
      <h1>Create City Crew</h1>
      <div className="container flex flex-cols">
        <div className="creation-section">
          <form onSubmit={handleCharacterCreation}>
            <label htmlFor="name">Character Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
            />
            <button type="submit">Create Character</button>
          </form>
        </div>
        <div className="players-section">
          <h2>Players:</h2>
          {players.length > 0 ? (
            <ul>
              {players.map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          ) : (
            <p>No players yet. Be the first to join!</p>
          )}
        </div>
      </div>
      <div className="button-container fixed bottom-0 flex justify-between w-full">
        <div className="button">
          <button onClick={onBack}>Back</button>
          <button>Start</button>
        </div>
      </div>
    </div>
  );
}

export default App;
