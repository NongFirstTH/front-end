// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./forApp.css";
import Map from "./components/webComponents/Map.jsx";
import {useDispatch} from "react-redux";
import useWebSocket from "./customHook/useWebSocket.ts";
import {setUsername} from "./store/Slices/usernameSlice.ts";
import {setGameState, selectWebSocket} from "./store/Slices/webSocketSlice.ts";

import {selectUsername} from "./store/Slices/usernameSlice.ts";

import {  useAppSelector } from "./store/hooks.ts";


function AddPlayer() {

  const usernameState = useAppSelector(selectUsername);
  const [players, setPlayers] = useState(usernameState.usernames);
  const [player, setPlayer] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();
  const {addPlayer,getPlayers,setState} = useWebSocket();

  const webSocketState = useAppSelector(selectWebSocket);

      useEffect(() => {
        getPlayers();
      }, []);

    useEffect(() => {
      setPlayers(usernameState.usernames);
//         console.log(usernameState.usernames);
//         console.log(players);
    }, [usernameState.usernames]);

//   const territoryState = useAppSelector((state) => state.territory.territory);

  const onClickStart = () => {
    setState("DEVISE");
  };

  const handleCharacterCreation = (event) => {
    event.preventDefault();

    if (!player) {
      alert("Please enter a name for your character.");
      return;
    }

    const existingPlayer = players.find((p) => p === player);

    if (existingPlayer) {
      alert("This name is already taken. Please choose a different name.");
    } else {
      dispatch(setUsername(player));
      setIsConfirmed(true);
      // console.log(player);
      addPlayer(player);
    }
  };

  return (
    <div>
        <div className="app-container h-screen bg-[#070F2B] flex flex-col justify-between">
            <div>
                <img src="/img/newlogo.png" alt="Game" className="mb-8" />
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
                            disabled={isConfirmed}
                            onChange={(e) => setPlayer(e.target.value)}
                        />
                        <button type="submit" disabled={isConfirmed}>Create Player</button>
                    </form>
                </div>
                {/* <div className="players-section">
                    <h2>Players:</h2>
                    {players.length > 0 ? (
                          <ul>
                            {players.map((player, i) => (
                              <li key={i}>{player}</li>
                            ))}
                          </ul>
                        ) : (
                        <p>No players yet. Be the first to join!</p>
                    )}
                </div> */}
            </div>
            <div className="button-container fixed bottom-0 flex justify-between w-full">
                <div className="button">
                    {webSocketState.isHead&&<button onClick={onClickStart} disabled={!usernameState.username}>Start</button>}
                </div>
            </div>
        </div>)
    </div>
  );
}

export default AddPlayer;
