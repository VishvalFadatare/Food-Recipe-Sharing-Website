import { createTheme } from '@mui/material/styles';

// Import the 'orange' color from the MUI palette
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500], // The main shade of orange
      contrastText: '#ffffff', // White text on the orange background
    },
    secondary: {
      main: orange[800], // A darker orange for secondary elements
    },
    background: {
      default: '#fdfdfd', // A very light, clean background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Poppins', // Add Poppins (or Open Sans)
      'sans-serif',
    ].join(','),
    h2: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    }
  },
});

export default theme;