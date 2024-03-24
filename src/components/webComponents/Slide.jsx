import React, { useState } from "react";

const Slider = ({ min, max, value, onChange }) => {
  const [sliderValue, setSliderValue] = useState((value - min) * 100 / (max - min)); // Initialize slider value

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value); // Parse slider value to float
    setSliderValue(newValue);

    // Map slider value to zoom level between min and max
    const newZoomLevel = min + (max - min) * newValue / 100;
    onChange(newZoomLevel); // Call provided onChange function with updated zoom level
  };

  const handleZoomIn = () => {
    const newZoomLevel = Math.min(value + 0.1, max); // Increase zoom level by 0.1 (adjust as needed)
    onChange(newZoomLevel);
    setSliderValue((newZoomLevel - min) * 100 / (max - min));
  };

  const handleZoomOut = () => {
    const newZoomLevel = Math.max(value - 0.1, min); // Decrease zoom level by 0.1 (adjust as needed)
    onChange(newZoomLevel);
    setSliderValue((newZoomLevel - min) * 100 / (max - min));
  };

  return (
    <div className="slider-container" style={{ display: "flex", alignItems: "center" }}>
      <button onClick={handleZoomOut}>-</button>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleChange}
        style={{ width: "30%", height: "20px"}}
      />
      <button onClick={handleZoomIn}>+</button>
    </div>
  );
};

export default Slider;