import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import MyTable from './HVAC Calculator/HVACC.tsx'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <MyTable />
  </React.StrictMode>,
  document.getElementById('root')
);