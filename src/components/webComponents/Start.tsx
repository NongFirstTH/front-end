import React, { useEffect } from "react";
import {setGameState, setStart} from "../../store/Slices/webSocketSlice.ts";
import {useDispatch} from "react-redux";
import useWebSocket from "../../customHook/useWebSocket.ts";

export default function Start() {
    const dispatch = useDispatch();
    const {connect,start,getPlayers} = useWebSocket();
    const onClickStart = () => {
        dispatch(setStart());
        dispatch(setGameState('INIT'));
        start();
        getPlayers();
    };

    useEffect(() => {
        connect();
    }, []);

    return (<div className="app-container flex flex-col items-center justify-center h-screen">
      <img src="/img/newlogo.png" alt="Game" className="mb-8" />{" "}
      {/* Added photo */}
      <h1 className="text-4xl font-bold mb-4">Welcome to UPBEAT</h1>
        <h2 className="text-lg text-gray-700 mb-8">
          Are you ready to embark on an exciting journey as the newly elected
          mayor of a budding city?{" "}
        </h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick = {onClickStart} >
        Start Game
      </button>
    </div>)
}