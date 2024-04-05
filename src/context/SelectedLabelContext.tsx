import React, { createContext, useState } from 'react';
import { LabelType } from '../types/LabelType';

interface SelectedLabelContextType {
  selectedLabel: LabelType | null;
  setSelectedLabel: React.Dispatch<React.SetStateAction<LabelType | null>>;
}

interface selectedLabelProviderProps {
  children: React.ReactNode;
}

export const SelectedLabelContext = createContext<SelectedLabelContextType>({
  selectedLabel: null,
  setSelectedLabel: () => {},
});

export const SelectedLabelProvider = ({
  children,
}: selectedLabelProviderProps) => {
  const [selectedLabel, setSelectedLabel] = useState<LabelType | null>(null);

  return (
    <SelectedLabelContext.Provider value={{ selectedLabel, setSelectedLabel }}>
      {children}
    </SelectedLabelContext.Provider>
  );
};
