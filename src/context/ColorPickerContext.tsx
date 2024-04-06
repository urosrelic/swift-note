import { ReactNode, createContext, useState } from 'react';

interface ColorPickerContextProps {
  children: ReactNode;
}

interface ColorPickerContextType {
  isColorPickerOpen: boolean;
  selectedColor: string;
  openColorPicker: () => void;
  closeColorPicker: () => void;
  selectColor: (color: string) => void;
}

export const ColorPickerContext = createContext<
  ColorPickerContextType | undefined
>(undefined);

export const ColorPickerProvider = ({ children }: ColorPickerContextProps) => {
  // * States
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  // * Handlers
  const openColorPicker = () => setIsColorPickerOpen(true);
  const closeColorPicker = () => setIsColorPickerOpen(false);

  const selectColor = (color: string) => {
    setSelectedColor(color);
  };

  const value = {
    isColorPickerOpen,
    selectedColor,
    openColorPicker,
    closeColorPicker,
    selectColor,
  };

  return (
    <ColorPickerContext.Provider value={value}>
      {children}
    </ColorPickerContext.Provider>
  );
};
