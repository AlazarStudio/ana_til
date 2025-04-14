import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';  // Импорт регистрации Service Worker

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Зарегистрировать Service Worker для PWA
serviceWorkerRegistration.register();