import { useContext } from 'react';
import { SelectedNoteContext } from '../context/SelectedNoteContext';

const useSelectedNote = () => {
  const context = useContext(SelectedNoteContext);
  if (!context) {
    throw new Error(
      'useSelectedNote must be used within a SelectedNoteProvider'
    );
  }
  return context;
};

export default useSelectedNote;
