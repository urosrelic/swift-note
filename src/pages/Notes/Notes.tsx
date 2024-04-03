import { useState } from 'react';
import NotesList from '../../components/Notes/NotesList';
import Modal from '../../components/Styled/Modal.styled';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import { NoteType } from '../../utils/types/NoteType';
import './Notes.css';

const Notes = ({ gridView }: GridProps) => {
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedNotes = notes
    ? [...notes].sort((a, b) => b.createdAt - a.createdAt)
    : [];

  const pinnedNotes = sortedNotes.filter(
    (note) => note.pinned && !note.archived && !note.deleted
  );
  const otherNotes = sortedNotes.filter(
    (note) => !note.pinned && !note.archived && !note.deleted
  );

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
      {isModalOpen && (
        <Modal
          closeModalHandler={handleCloseModal}
          style={{
            width: '320px',
            backgroundColor: selectedNote?.color,
          }}
        >
          {selectedNote?.title ? (
            <h1>{selectedNote?.title}</h1>
          ) : (
            <h1>No Title</h1>
          )}
          {selectedNote?.content ? (
            <textarea
              readOnly={true}
              style={{
                width: '100%',
                height: '300px',
                border: 'none',
                fontSize: '1.1rem',
                backgroundColor: 'transparent',
              }}
            >
              {selectedNote?.content}
            </textarea>
          ) : (
            <h2>No content</h2>
          )}
        </Modal>
      )}
    </>
  );
};

export default Notes;
