import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import MyTable from './HVAC Calculator/HVACC.tsx'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    <MyTable />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);