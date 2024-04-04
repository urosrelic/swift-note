import { useContext } from 'react';
import { ColorPickerContext } from '../context/ColorPickerContext';

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider');
  }
  return context;
};
