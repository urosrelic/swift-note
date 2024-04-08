import React, { createContext, useState } from 'react';
import { LabelType } from '../types/LabelType';

interface LabelPickerContextType {
  isLabelPickerOpen: boolean;
  label: LabelType | null;
  openLabelPicker: () => void;
  closeLabelPicker: () => void;
  setLabel: (label: LabelType) => void;
}

interface LabelPickerProviderProps {
  children: React.ReactNode;
}

export const LabelPickerContext = createContext<LabelPickerContextType>({
  isLabelPickerOpen: false,
  label: null,
  setLabel: () => {},
  openLabelPicker: () => {},
  closeLabelPicker: () => {},
});

export const LabelPickerProvider = ({ children }: LabelPickerProviderProps) => {
  // * States
  const [isLabelPickerOpen, setIsLabelPickerOpen] = useState(false);
  const [label, setLabel] = useState<LabelType | null>(null);

  // * Handlers
  const openLabelPicker = () => setIsLabelPickerOpen(true);
  const closeLabelPicker = () => setIsLabelPickerOpen(false);

  const selectLabel = (label: LabelType) => {
    setLabel(label);
  };

  const value = {
    isLabelPickerOpen,
    label,
    openLabelPicker,
    closeLabelPicker,
    setLabel,
    selectLabel,
  };

  return (
    <LabelPickerContext.Provider value={value}>
      {children}
    </LabelPickerContext.Provider>
  );
};
