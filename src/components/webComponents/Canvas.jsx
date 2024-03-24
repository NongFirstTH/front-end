import React, { createRef, useEffect, useState } from "react";
import "./styles/App.css";
import { useAppSelector } from "../../store/hooks";
import { selectConfig } from "../../store/Slices/configSlice";
import { selectTerritory } from "../../store/Slices/territorySlice.ts";
import { selectUsername } from "../../store/Slices/usernameSlice.ts";

export default function Canvas(props) {
  const [hexSize, setHexSize] = useState(40*props.zoomLevel);
  const territoryState = useAppSelector(selectTerritory);
  const usernameState = useAppSelector(selectUsername);
  const configState = useAppSelector(selectConfig);
  const [rows, setRows] = useState(configState.m);
  const [cols, setCols] = useState(configState.n);
  const [playerName, setPlayerName] = useState(usernameState.username);
  let currow = 0;
  let curcol = 0;
  let cityCenterRow = 0;
  let cityCenterCol = 0;
  const canvasRef = createRef();
  const { width, height } = calculateCanvasSize();
  const [cityCenterImage, setCityCenterImage] = useState(null);
  const [crewImage, setCrewImage] = useState(null);

  useEffect(() => {
    setHexSize(40 * props.zoomLevel);
  }, [props.zoomLevel]);

  useEffect(() => {
    const loadCityCenterImage = () => {
        const img = new Image();
        img.src = "img/citycenter.png";
      setCityCenterImage(img);
    };
    const loadCrewImage = () => {
      const img = new Image();
      img.src = "img/crew.png";
      setCrewImage(img);
    };
    
    loadCityCenterImage();
    loadCrewImage();
  }, []);


  useEffect(() => {
    if (props.mapArray) {
        console.log(territoryState)
        const thisPlayer = territoryState.players.find( arr => arr.name === usernameState.username)
    if (thisPlayer) {
        currow = thisPlayer.currow;
        curcol = thisPlayer.curcol;
        cityCenterRow = thisPlayer.row;
        cityCenterCol = thisPlayer.col;
    }
      const canvasHex = canvasRef.current;
      const ctx = canvasHex.getContext("2d");
      ctx.clearRect(0, 0, canvasHex.width, canvasHex.height);
      drawHexes(canvasHex);
    }
  }, [hexSize,props.mapArray,territoryState,currow,curcol,cityCenterRow,cityCenterCol]);

  function calculateCanvasSize() {
    const { hexWidth, hexHeight, vertDist, horizDist } = getHexParameters();
    const newWidth = cols * horizDist + hexWidth / 2 + 10;
    const newHeight = rows * vertDist + hexHeight + 20;
    return { width: newWidth, height: newHeight };
  }

  const evenq_to_axial = (hex) => {
    const q = hex.col;
    const r = hex.row - (q - (q & 1)) / 2;
    return Hex(q, r);
  };

  const drawHexes = (canvas) => {
    props.mapArray.map((innerArray, r) => {
      innerArray.map((element, q) => {
        const evenQCoord = { col: q + 1, row: r + 1 };
        const axialCoord = evenq_to_axial(evenQCoord);
        let center = hexToPixel(axialCoord);
        console.log(playerName);
        drawHex(canvas, center, element);
            // if (element.element.player !== null)
            //   drawHexCoordinates(canvas, center,element);
      });
    });
  };

  const drawHex = (canvasID, center, map) => {
    for (let i = 0; i <= 5; i++) {
      let start = getHexCornorCoord(center, i);
      let end = getHexCornorCoord(center, i + 1);
      fillMap(start, end, canvasID, center, map);
      fillRegion(canvasID, center, map);
      fillCityCenter(canvasID, center, map);
      fillCrew(canvasID, center, map);
    }
  }

    function fillCityCenter(canvasID, center, map) {
      if (map.i+1 === cityCenterRow && map.j+1 === cityCenterCol) {
        fillHex(canvasID, center, "#1D8348");
        const ctx = canvasID.getContext("2d");
        const imageWidth = 80 * props.zoomLevel;
        const imageHeight = 70 * props.zoomLevel;
        const imageX = center.x - imageWidth / 2;
        const imageY = center.y - imageHeight / 2;
          if(cityCenterImage  && cityCenterImage.complete){
            ctx.drawImage(cityCenterImage, imageX, imageY, imageWidth, imageHeight);
          }else{
            const img = new Image();
            img.src = "img/citycenter.png";
            img.onload = () => {
            ctx.drawImage(img, imageX, imageY, imageWidth, imageHeight);
          }
          }
      }
    }

     function fillCrew(canvasID, center, map) {
      if (map.i+1 === currow && map.j+1 === curcol) {
        drawCrew(canvasID, center, "#59CC8A");
      }
    };

    function fillRegion(canvasID, center, map) {
      //my regions
      if (map.element.player == playerName && !(map.i+1 === cityCenterRow && map.j+1 === cityCenterCol) && map.element.deposit !== 0) {
        fillHex(canvasID, center, "#59CC8A");
      } else if (map.element.player !== null && map.element.deposit !== 0) {//other player regions
        fillHex(canvasID, center, "gray");
      } else{ //fill map color 
        fillHex(canvasID, center, "#C4B29D");
      }
    };

  function fillMap(start, end, canvasID, center, map) {
    drawLine(
      canvasID,
      { x: start.x, y: start.y },
      { x: end.x, y: end.y },
      "#382106",
      6
    );
    fillHex(canvasID, center, "#C4B29D");
  }

  const drawCrew = (canvasID, center, fillColor) => {
    const imageWidth = 120 * props.zoomLevel;
    const imageHeight = 120 * props.zoomLevel;
    const imageX = center.x - imageWidth / 2;
    const imageY = center.y - imageHeight / 2;
      const ctx = canvasID.getContext("2d");
      const crewRadius = hexSize / 2.5;
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(center.x, center.y-14, crewRadius, 0, 2 * Math.PI);
      ctx.fill();
      if (crewImage  && crewImage.complete) {
        ctx.drawImage(crewImage, imageX, imageY-17, imageWidth, imageHeight);
      }else{
        const img = new Image();
        img.src = "img/crew.png";
        img.onload = () => {
            ctx.drawImage(img, imageX, imageY-17, imageWidth, imageHeight);
          };
        }
  };

  const fillHex = (canvasID, center, fillColor) => {
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      let corner = getHexCornorCoord(center, i);
      if (i === 0) {
        ctx.moveTo(corner.x, corner.y);
      } else {
        ctx.lineTo(corner.x, corner.y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  };

  const getHexCornorCoord = (center, i) => {
    let angle_deg = 60 * i;
    let angle_rad = (Math.PI / 180) * angle_deg;
    let x = center.x + hexSize * Math.cos(angle_rad);
    let y = center.y + hexSize * Math.sin(angle_rad);
    return Point(x, y);
  };

  function getHexParameters() {
    let hexWidth = hexSize * 2;
    let hexHeight = Math.sqrt(3) * hexSize;
    let vertDist = hexHeight;
    let horizDist = (3 / 2) * hexSize;
    return { hexWidth, hexHeight, vertDist, horizDist };
  }

  const hexToPixel = (hex) => {
    let x = hexSize * ((3 / 2) * hex.q);
    let y = hexSize * ((Math.sqrt(3) / 2) * hex.q + Math.sqrt(3) * hex.r);
    return Point(x, y);
  };

  const Point = (x, y) => {
    return { x: x, y: y };
  };

  const Hex = (q, r) => {
    return { q: q, r: r };
  };

  const drawLine = (canvasID, start, end, color, line) => {
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = line;
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  };

  const drawHexCoordinates = (canvasID, center,map) => {
    const ctx = canvasID.getContext("2d");
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(map.element.deposit, center.x, center.y);
    // ctx.fillText(h.r, center.x - 10, center.y);
    // ctx.fillText(h.q, center.x + 7, center.y);
  };
  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}
