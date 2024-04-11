import { IconArchive } from '@tabler/icons-react';
import { useState } from 'react';
import NotesList from '../../components/Notes/NoteList/NoteList';
import SelectedNote from '../../components/Notes/SelectedNote/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { useSearch } from '../../hooks/useSearch';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { NoteType } from '../../types/NoteType';
import './Archived.css';

const Archived = ({ gridView }: GridProps) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks
  const { searchTerm } = useSearch();
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);
  const { setSelectedNote } = useSelectedNote();

  // Filter notes array
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
        <div
          className={`archived-notes-section ${
            gridView ? 'grid-view' : 'list-view'
          }`}
        >
          <div className='archived-notes-title'>
            <IconArchive size={28.8} style={{ marginRight: '0.5rem' }} />
            Archived Notes
          </div>
        </div>
        {archivedNotes.length > 0 ? (
          <NotesList
            notes={archivedNotes}
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

export default Archived;
