import { useState } from 'react';
import NotesList from '../../components/Notes/NoteList/NoteList';
import SelectedNote from '../../components/Notes/SelectedNote/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { NoteType } from '../../types/NoteType';
import './Archived.css';

const Archived = ({ gridView }: GridProps) => {
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
  const archivedNotes = sortedNotes?.filter(
    (note) => note.archived && !note.deleted
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
      <div className='archived-notes'>
        <span className='archived-notes-section-title'>Archived Notes</span>
        {archivedNotes.length > 0 ? (
          <NotesList
            notes={archivedNotes}
            gridView={gridView}
            loading={loading}
            handleNoteClick={handleNoteClick}
          />
        ) : (
          <span className='empty-notes'>No notes</span>
        )}
      </div>
      <SelectedNote
        selectedNote={selectedNote}
        isModalOpen={isModalOpen}
        closeModalHandler={handleCloseModal}
      />
    </>
  );
};

export default Archived;
