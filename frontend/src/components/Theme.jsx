import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#041c32',
    },
    secondary: {
      main: '#ECB365',
    },
    text: {
      primary: '#ECB365',
      secondary: '#041c32',
    },
    background: {
      default: '#041C32',
      paper: '#02101F',
    },
  },
  typography: {
    fontFamily: "iA Writer Duospace",
  }
});
