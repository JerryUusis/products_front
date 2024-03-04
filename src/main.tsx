import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import { amber } from '@mui/material/colors';

const theme = createTheme({
  palette:{
    primary: {
      main:amber[500]
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "10rem",
          padding: "1rem"
        }
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
