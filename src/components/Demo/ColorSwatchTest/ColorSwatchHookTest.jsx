import { React } from "react";
import "./ColorSwatchTest.scss";

import Button from "@mui/material/Button";

import useColorSwatch from "../../../hooks/useColorSwatch.ts";


// color string literals as an array
const colorPalette = ["#F4B942", "#45CB85", "#6A7FDB", "#EC0B43", "#FF785A"];

// component for swatch changing buttons
const ColorSwatchTestButton = ({ color, onClick }) => (
  <Button
    onClick={onClick}
    // super hacky - I don't like this approach
    sx={{
      backgroundColor: color,
      minHeight: "3rem",
      transition: "transform 100ms",
      transform: "scale(1.0)",
      width: "100%",
      "&:hover": {
        backgroundColor: color,
        transform: "scale(1.02)",
      },
    }}
  >
    {color}
  </Button>
);

// component for the swatch display, assumes color is a valid color string
const ColorSwatch = ({ color, isLoaded }) => (
  <div
    className={`color-swatch ${isLoaded ? "loaded" : ""}`}
    style={{ backgroundColor: color }}
  ></div>
);

const ColorSwatchHookTest = () => {
  const { colorIsLoaded, currentColor, updateColor } = useColorSwatch(true);

  // handle button press
  const handleButtonPress = (color) => {
    updateColor(color);
  };

  return (
    <div className="color-swatch-test">
      <ColorSwatch color={currentColor} isLoaded={colorIsLoaded} />

      <div className="loading-status">
        {!colorIsLoaded ? "Loading..." : "Loaded."}
      </div>

      <div className="color-swatch-button-container">
        {colorPalette.map((color, index) => (
          <ColorSwatchTestButton
            color={color}
            key={`button-${index}`}
            onClick={() => handleButtonPress(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSwatchHookTest;
