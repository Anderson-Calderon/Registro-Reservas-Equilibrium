import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '../dist/dist/css/AdminLTE.css'
import '../dist/dist/css/skins/_all-skins.min.css'
import '../dist/dist/js/adminlte.min.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
