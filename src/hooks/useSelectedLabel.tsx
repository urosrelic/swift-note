import { useContext } from 'react';
import { SelectedLabelContext } from '../context/SelectedLabelContext';

export const useSelectedLabel = () => {
  const context = useContext(SelectedLabelContext);
  if (!context) {
    throw new Error(
      'useSelectedLabel must be used within a SelectedLabelProvider'
    );
  }
  return context;
};
