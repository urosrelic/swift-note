import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SelectedNoteProvider } from './context/SelectedNoteContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedNoteProvider>
      <App />
    </SelectedNoteProvider>
  </React.StrictMode>
);
