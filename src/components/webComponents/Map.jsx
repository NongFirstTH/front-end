import React, { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas";
import Slider from "./Slide"; // Import the Slider component

import "./styles/App.css";
import { useAppSelector } from "../../store/hooks.ts";
import { selectTerritory } from "../../store/Slices/territorySlice.ts";
import { selectWebSocket } from "../../store/Slices/webSocketSlice.ts";

const Map = () => {
  const webSocketState = useAppSelector(selectWebSocket);
  const territoryState = useAppSelector(selectTerritory);
  const [zoomLevel, setZoomLevel] = useState(1);

  const mappedArray = territoryState.territory.map((innerArray, i) => {
    return innerArray.map((element, j) => {
      return { i, j, element };
    });
  });

  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };

  const handlePan = (deltaX, deltaY) => {
    setCenter((prevCenter) => ({
      x: prevCenter.x + deltaX,
      y: prevCenter.y + deltaY,
    }));
  };

  return (
    <>
      <div className="map-container">
        <div
              style={{
                width: "800px", // Set your desired width
                height: "600px", // Set your desired height
                overflow: "auto", // Enable scrolling
                border: "1px solid #ccc", // Add a border for visualization
              }}
            >
              <Canvas mapArray={mappedArray} zoomLevel={zoomLevel} />
            </div>
        <div className="slider-wrapper">
          <Slider min={0.1} max={1.5} value={zoomLevel} onChange={handleZoomChange} />
        </div>
      </div>
    </>
  );
};

export default Map;
