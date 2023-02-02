import { React, useState } from 'react';
import './ColorSwatchTest.scss';

import Button from '@mui/material/Button';

const colorPalette = [
  "#F4B942",
  "#45CB85",
  "#6A7FDB",
  "#EC0B43",
  "#FF785A",
];

// component for swatch changing buttons
const ColorSwatchTestButton = ({color, onClick}) => (
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
      }
    }}
  >
    {color}
  </Button>
)

// component for the swatch display, assumes color is a valid color string
const ColorSwatch = ({color}) => (
  <div className="color-swatch" style={{backgroundColor: color}}></div>
);

const ColorSwatchTest = () => {
  // hardcoded ID to one specific ColorSwatchTable doc for this example
  const [ colorID, setColorID ] = useState(1);

  // store subscribed DynamoDB thing here
  // right now it's hardcoded garbage
  const currentColor = colorPalette[colorID]; 

  return ( 
    <div className="color-swatch-test">
      <ColorSwatch color={currentColor}/>

      <div className="color-swatch-button-container">
        {
          colorPalette.map((color, index) => (
            <ColorSwatchTestButton 
              color={color} 
              key={`button-${index}`}
              onClick={() => setColorID(index)}
          />))
        }
      </div>
    </div> 
  );
}
 
export default ColorSwatchTest;