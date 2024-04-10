import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import NotesList from '../../components/Notes/NoteList/NoteList';
import SelectedNote from '../../components/Notes/SelectedNote/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { useSearch } from '../../hooks/useSearch';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { NoteType } from '../../types/NoteType';
import './Deleted.css';
const Deleted = ({ gridView }: GridProps) => {
  // States

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks
  const { searchTerm } = useSearch();
  const { currentUser } = useAuth();
  const { notes, loading, removeFromTrash } = useFirebase(currentUser);
  const { setSelectedNote } = useSelectedNote();

  // Filter notes

  const sortedNotes = notes
    ? [...notes]
        .sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
        )
        .filter(
          (note) =>
            note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (note.title &&
              note.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <span
          className={`deleted-notes-section ${
            gridView ? 'grid-view' : 'list-view'
          }`}
        >
          <div className='deleted-notes-title'>
            <DeleteIcon sx={{ fontSize: '1.8rem', marginRight: '0.5rem' }} />
            Deleted notes
          </div>
          {deletedNotes.length > 0 && (
            <button
              className='deleted-notes-empty-btn'
              onClick={handleEmptyTrash}
            >
              Empty trash
            </button>
          )}
        </span>

        {deletedNotes.length > 0 ? (
          <NotesList
            notes={deletedNotes}
            gridView={gridView}
            loading={loading}
            handleNoteClick={handleNoteClick}
          />
        ) : (
          <span
            className={`empty-notes ${gridView ? 'grid-view' : 'list-view'}`}
          >
            No notes
          </span>
        )}
      </div>
      <SelectedNote
        isModalOpen={isModalOpen}
        closeModalHandler={handleCloseModal}
      />
    </>
  );
};

export default Deleted;
