import { useState } from 'react';
import NotesList from '../../components/Notes/NotesList';
import SelectedNote from '../../components/Notes/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { NoteType } from '../../types/NoteType';
import './Deleted.css';
const Deleted = ({ gridView }: GridProps) => {
  // States

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks

  const { currentUser } = useAuth();
  const { notes, loading, removeFromTrash } = useFirebase(currentUser);
  const { selectedNote, setSelectedNote } = useSelectedNote();

  // Filter notes

  const sortedNotes = notes
    ? [...notes].sort(
        (a, b) =>
          b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      )
    : [];
  const deletedNotes = sortedNotes?.filter((note) => note.deleted);

  // Handlers

  const handleEmptyTrash = async () => {
    await removeFromTrash(deletedNotes);
  };

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
      <div className='deleted-notes'>
        <span className='deleted-notes-section-title'>Deleted notes</span>

        {deletedNotes.length > 0 && (
          <button
            className='deleted-notes-empty-btn'
            onClick={handleEmptyTrash}
          >
            Empty trash
          </button>
        )}

        {deletedNotes.length > 0 ? (
          <NotesList
            notes={deletedNotes}
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

export default Deleted;
