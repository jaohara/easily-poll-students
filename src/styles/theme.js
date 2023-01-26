import { createTheme } from "@mui/material";
import { deepPurple, amber } from "@mui/material/colors";
import "@fontsource/dm-sans";

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

const theme = createTheme({
  // project color pallete settings
  palette: { 
    primary: {
      main: deepPurple[500]
    },
    secondary: { 
      main: amber[500],
      contrastText: deepPurple[900]
    }
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
        variant: "outlined"
      },
      styleOverrides: {
        root: {
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