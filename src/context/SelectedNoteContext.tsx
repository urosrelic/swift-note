// SelectedNoteContext.tsx
import React, { createContext, useState } from 'react';
import { NoteType } from '../types/NoteType';

interface SelectedNoteContextType {
  selectedNote: NoteType | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
}

interface SelectedNoteProviderProps {
  children: React.ReactNode;
}

export const SelectedNoteContext = createContext<SelectedNoteContextType>({
  selectedNote: null,
  setSelectedNote: () => {},
});

export const SelectedNoteProvider = ({
  children,
}: SelectedNoteProviderProps) => {
  // * States
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

  return (
    <SelectedNoteContext.Provider value={{ selectedNote, setSelectedNote }}>
      {children}
    </SelectedNoteContext.Provider>
  );
};
