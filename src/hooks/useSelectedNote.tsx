import { useContext } from 'react';
import { SelectedNoteContext } from '../context/SelectedNoteContext';

const useSelectedNote = () => {
  return useContext(SelectedNoteContext);
};

export default useSelectedNote;
