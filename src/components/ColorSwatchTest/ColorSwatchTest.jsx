import { React, useState, useEffect } from 'react';
import './ColorSwatchTest.scss';

import Button from '@mui/material/Button';


// AWS AppSync related stuff
import { API, graphqlOperation } from "@aws-amplify/api";
import config from '../../aws-exports';
// automatically created query in graphql schema
import { getColorSwatch } from '../../graphql/queries';
import { updateColorSwatch } from '../../graphql/mutations';
import { onUpdateColorSwatch } from '../../graphql/subscriptions';

API.configure(config);

const COLOR_SWATCH_ID = 1;

// color string literals as an array
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
const ColorSwatch = ({color, isLoaded}) => (
  <div className={`color-swatch ${isLoaded ? "loaded" : ""}`} style={{backgroundColor: color}}></div>
);

const ColorSwatchTest = () => {
  const [ isLoaded, setIsLoaded ] = useState(false); 
  // const [ colorID, setColorID ] = useState(0);
  const [ currentColor, setCurrentColor ] = useState("#F4B942");

  // handle initial data load
  // useEffect(() => {
    // const fetchData = async () => {
    //   // not sure about this approach
    //   const initialColorResponse = await API.graphql({
    //     query: getColorSwatch,
    //     variables: {
    //       id: COLOR_SWATCH_ID
    //     }
    //   });

    //   // check to see data shape
    //   console.log(initialColorResponse);
    //   // test log color
    //   console.log(initialColorResponse.data.getColorSwatch.color);

    //   setIsLoaded(true);
    //   setCurrentColor(initialColorResponse.data.getColorSwatch.color);
    // }

    // fetchData();    
  // }, []);

  // subscribes to color swatch updates and returns the subscription
  //    TODO: abstract similar behavior to a hook
  const subscribe = () => {
    return API.graphql({
      query: onUpdateColorSwatch,
      variables: {
        id: COLOR_SWATCH_ID
      }
    })
    .subscribe({
      next: colorData => {
        console.log(`recieved new colorData from subscription:`);
        console.log(colorData);
        // data lives at colorData.value.data.onUpdateColorSwatch.color
        setCurrentColor(colorData.value.data.onUpdateColorSwatch.color);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialColorResponse = await API.graphql({
        query: getColorSwatch,
        variables: {
          id: COLOR_SWATCH_ID
        }
      });

      setIsLoaded(true);
      setCurrentColor(initialColorResponse.data.getColorSwatch.color);
    }

    // fetch initial data
    fetchData();  

    // use graphql subscription
    const colorSubscription = subscribe();

    // return cleanup for subscriptions
    return () => colorSubscription.unsubscribe();
  }, []);

  // handle button press
  const handleButtonPress = (color) => {
    const submitData = async () => {
      // also not sure how this approach is different
      await API.graphql(graphqlOperation(updateColorSwatch, { input: {id: COLOR_SWATCH_ID, color: color}}));
    };

    submitData();
    // setCurrentColor(color);
  };

  return ( 
    <div className="color-swatch-test">
      <ColorSwatch color={currentColor} isLoaded={isLoaded}/>

      <div className="loading-status">
        {!isLoaded ? "Loading..." : "Loaded."}
      </div>

      <div className="color-swatch-button-container">
        {
          colorPalette.map((color, index) => (
            <ColorSwatchTestButton 
              color={color} 
              key={`button-${index}`}
              // onClick={() => setColorID(index)}
              // onClick={() => setCurrentColor(color)}
              onClick={() => handleButtonPress(color)}
          />))
        }
      </div>
    </div> 
  );
}
 
export default ColorSwatchTest;