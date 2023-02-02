import React from 'react';

import Button from '@mui/material/Button';

const colorPalette = [
  "#F4B942",
  "#6A7FDB",
  "#FF785A",
  "#45CB85",
  "#EC0B43",
]

// component for swatch changing buttons
const ColorSwatchTestButton = (color) => (
  <Button
    onClick={()=>console.log(`${color} button pressed`)}
  >
    {color}
  </Button>
)

// component for the swatch display
const ColorSwatch = (color) => (

);

const ColorSwatchTest = () => {
  // store subscribed DynamoDB thing here
  const currentColor = colorPalette[0]; // TODO: 

  return ( 
    <div className="color-swatch-test">
      <ColorSwatch />

      <div className="color-swatch-button-container">
        {
          colorPalette.map(color => (<ColorSwatchTestButton color={color} />))
        }
      </div>
    </div> 
  );
}
 
export default ColorSwatchTest;