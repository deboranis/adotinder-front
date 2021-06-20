import { createMuiTheme } from "@material-ui/core/styles"

export const themeColors = createMuiTheme({
	palette: {
    primary: {
      main: '#4A44F2', 
      //azul
    },
    secondary: {
      main: '#D61E4F', 
      //pink
    },
    status: {
      success: '#F8931D',
      // laranja
      warning: '#FFFFFF',
      //branco
      info: '#F2BE22',
      // amarelo
      error: '#7503A6'
      // roxo
    },
  }
});

export const coolFont = createMuiTheme({
  typography: {
    fontFamily: [
      'Abril Fatface',
      'cursive',
    ].join(','),
  },
});

export const baseFont = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
});