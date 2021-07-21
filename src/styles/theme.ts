import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#d7ffd9',
      main: '#a5d6a7',
      dark: '#75a478',
      contrastText: '#232323',
    },
    secondary: {
      light: '#ffddc1',
      main: '#ffab91',
      dark: '#de8266',
      contrastText: '#fafafa',
    },
  },
});

export default theme;
