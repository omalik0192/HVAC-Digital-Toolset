import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MyTable from './HVAC Calculator/HVAC_Table.tsx'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  overrides: {
    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor: '#FFFACD', // your preferred color for the hover effect
         
        },
      },
    },
    
    
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <h1>HVAC Duct Pressure Loss Calculation</h1>
    <MyTable />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);