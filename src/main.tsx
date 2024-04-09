import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ColorPickerProvider } from './context/ColorPickerContext.tsx';
import { LabelPickerProvider } from './context/LabelPickerContext.tsx';
import { SelectedNoteProvider } from './context/SelectedNoteContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedNoteProvider>
      <ColorPickerProvider>
        <LabelPickerProvider>
          <App />
        </LabelPickerProvider>
      </ColorPickerProvider>
    </SelectedNoteProvider>
  </React.StrictMode>
);
