import React, { useState } from 'react';
import NotesList from '../../components/Notes/NotesList';
import SelectedNote from '../../components/Notes/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../utils/types/GridProps';
import { NoteType } from '../../utils/types/NoteType';
import './Notes.css';

const Notes: React.FC<GridProps> = ({ gridView }) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);
  const { selectedNote, setSelectedNote } = useSelectedNote();

  // Filter notes array

  const sortedNotes = notes
    ? [...notes].sort(
        (a, b) =>
          b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      )
    : [];

  const pinnedNotes = sortedNotes.filter(
    (note) => note.pinned && !note.archived && !note.deleted
  );
  const otherNotes = sortedNotes.filter(
    (note) => !note.pinned && !note.archived && !note.deleted
  );

  // Handlers

  const handleNoteClick = (note: NoteType) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <>
      <div className='pinned-notes'>
        <span className='notes-section-title'>Pinned Notes</span>
        <NotesList
          notes={pinnedNotes}
          gridView={gridView}
          loading={loading}
          handleNoteClick={handleNoteClick}
        />
      </div>
      <div className='other-notes'>
        <span className='notes-section-title'>Other notes</span>
        <NotesList
          notes={otherNotes}
          gridView={gridView}
          loading={loading}
          handleNoteClick={handleNoteClick}
        />
      </div>
      <SelectedNote
        selectedNote={selectedNote}
        isModalOpen={isModalOpen}
        closeModalHandler={handleCloseModal}
      />
    </>
  );
};

export default Notes;
