import { createTheme } from "@mui/material";
import "@fontsource/dm-sans";

// TODO: Export sizes/colors so other components can reference them

// reusable sizes for consistency
const sizes = {
  borderRadius: "8px",
  margin: {
    containerBottom: "2rem",
    buttonRight: "1rem",
  },
  padding: {
    container: "1rem",
  },
};

const colors = { 
  deepSpaceSparkle: "#476A6F",
  polishedPine: "#519E8A",
}

const theme = createTheme({
  // project color pallete settings
  palette: { 
    primary: {
      main: colors.polishedPine,
    },
  },
  // project typography settings
  typography: { 
    fontFamily: [
      'DM Sans',
      'sans-serif'
    ].join(','),
  },
  // props and style overrides for components
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained"
      },
      styleOverrides: {
        root: {
          // borderWidth: "2px",
          borderRadius: sizes.borderRadius,
          marginRight: sizes.margin.buttonRight,
          textTransform: "none",
        }
        
      }
    },
    MuiCard: {
      defaultProps: {

      },
      styleOverrides: {
        root: {
          borderRadius: sizes.borderRadius,
          marginBottom: sizes.margin.containerBottom,
          padding: sizes.padding.container,
        }
      }
    }
  }
});

export default theme;