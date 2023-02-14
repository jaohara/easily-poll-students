import { useState, useEffect } from "react";
//@ts-ignore
import useApi from "./useApi";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getColorSwatch } from "../graphql/queries";
import { updateColorSwatch } from "../graphql/mutations";
import { onUpdateColorSwatch } from "../graphql/subscriptions";

const COLOR_SWATCH_ID = 1;

// the "variables" key for our queries
const colorSwatchVariablesObject = {
  variables: { 
    id: COLOR_SWATCH_ID,
  }
};

function useColorSwatch (subscribeToChanges = false) {
  const [ colorIsLoaded, setColorIsLoaded ] = useState(false);
  const [ currentColor, setCurrentColor ] = useState();
  
  const API = useApi();

  const updateColor = (newColor: string) => {
    const submitData = async () => {
      await API.graphql(graphqlOperation(updateColorSwatch, {
        input: { 
          id: COLOR_SWATCH_ID, 
          color: newColor,
        }})
      );
    };

    submitData();
  };

  const subscribe = () => {
    return API.graphql({
      query: onUpdateColorSwatch,
      ...colorSwatchVariablesObject,
    }).subscribe({
      next: (colorData) => 
        setCurrentColor(colorData.value.data.onUpdateColorSwatch.color)
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialColorResponse = await API.graphql({
        query: getColorSwatch,
        ...colorSwatchVariablesObject,
      });

      setColorIsLoaded(true);
      setCurrentColor(initialColorResponse.data.getColorSwatch.color);
    };

    fetchData();

    if (subscribeToChanges) {
      const colorSubscription = subscribe();
      return () => colorSubscription.unsubscribe();
    }
  }, []);

  return { 
    colorIsLoaded,
    currentColor, 
    updateColor,
  };
}

export default useColorSwatch;
