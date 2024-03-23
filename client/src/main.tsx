import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { LyricContextProvider } from './context/LyricContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LyricContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LyricContextProvider>
  </React.StrictMode>
);
