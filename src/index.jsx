import React, { useState } from "react";
import "./forApp.css";
import Init from "./Init.jsx";
import AddPlayer from "./AddPlayer.jsx";
import Start from "./components/webComponents/Start.tsx";
import Map from "./components/webComponents/Map.jsx";
import DevisePlan from "./components/webComponents/DevisePlan.jsx";
import RevisePlan from "./components/webComponents/RevisePlan.jsx";
import Wait from "./components/webComponents/Wait.jsx";
import Turn from "./components/webComponents/Turn.jsx";
import End from "./components/webComponents/End.jsx";
import { useAppSelector } from "./store/hooks.ts";
import { selectWebSocket } from "./store/Slices/webSocketSlice.ts";
import { selectConfig } from "./store/Slices/configSlice.ts";
import { selectUsername } from "./store/Slices/usernameSlice.ts";

const Index = () => {
  const webSocketState = useAppSelector(selectWebSocket);
  const configState = useAppSelector(selectConfig);
  const usernameState = useAppSelector(selectUsername);

  let content;

  if (!webSocketState.isStart) {
    content = <Start />;
  } else {
    switch (webSocketState.gameState) {
      case 'START':
        content = <Start />;
        break;
      case 'INIT':
        content = configState.init ? <AddPlayer /> : <Init />;
        break;
      case 'ADD':
        content = <AddPlayer />;
        break;
      case 'END' :
        content = <End />;
        break
      default:
        content = (
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              {(() => {
                switch (webSocketState.gameState) {
                  case 'DEVISE':
                    return usernameState.username ? <DevisePlan /> : <></>;
                  case 'TURN':
                    return webSocketState.turn === usernameState.username ? <Turn /> : <Wait />;
                  case 'REVISE':
                    return webSocketState.turn === usernameState.username ? <Turn /> : <Wait />;
                  default:
                    return null;
                }
              })()}
            </div>
            <div style={{ flex: 1 }}>
               <Map />
            </div>
          </div>
        );
        break;
    }
  }

  return content;
};

export default Index;