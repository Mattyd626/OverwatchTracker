import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#ec669a',
    },
    background: { 
      default: '#7F55B1',
      paper: "#F4A7B9"
    },
    primary: {
      main: '#B3E5FC',
    },
    secondary: {
      main: "#D1B3FF",
    }
  },
  typography: {
    fontFamily: '"Cookiemonster", "Brush Script MT", "Dancing Script", BrushScriptMT, cursive',
    fontSize: 18,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        body: {
          color: 'var(--text-color)',
          backgroundColor: 'var(--bg-color)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        paper: {
          '&:hover': { backgroundColor: '#F7B0C0'}
        },
        containedSecondary: {
          '&:hover': { backgroundColor: '#C18FFF' } 
        },
        containedPrimary: {
          '&:hover': { backgroundColor: '#81D4FA' }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: 'rgba(255, 156, 163, 0.37)' },
          '&.Mui-checked': { color: '#ec669a' },
        },
        colorPrimary: {
          '&.Mui-checked': { color: '#ec669a' }
        }
      }
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
