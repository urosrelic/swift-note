import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useFirebase from '../../../hooks/useFirebase';
import useSelectedNote from '../../../hooks/useSelectedNote';
import Modal from '../../Styled/Modal.styled';
import './SelectedNote.css';

interface SelectedNoteProps {
  isModalOpen: boolean;
  closeModalHandler: () => void;
}

const SelectedNote: React.FC<SelectedNoteProps> = ({
  isModalOpen,
  closeModalHandler,
}) => {
  // * States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // * Hooks
  const { selectedNote } = useSelectedNote();
  const { currentUser } = useAuth();
  const { updateNote } = useFirebase(currentUser);
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || '');
      setContent(selectedNote.content || '');
    }
  }, [selectedNote]);

  // * Handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleUpdateNote = () => {
    if (selectedNote?.noteId) {
      updateNote(selectedNote.noteId, title, content);
      closeModalHandler();
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModalHandler={closeModalHandler}
          style={{
            modalContainer: {
              width: '90%',
              maxWidth: '500px',
              backgroundColor: selectedNote?.color,
            },
          }}
        >
          {selectedNote && (
            <div className='selected-note-details'>
              <div className='selected-note-title'>
                <input
                  className='input-title'
                  type='text'
                  value={title}
                  onChange={handleTitleChange}
                  placeholder='Set a title ...'
                />
              </div>
              <div className='selected-note-content'>
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder='Type something ...'
                />
              </div>
              <div className='selected-note-date'>
                {selectedNote.deleted ? (
                  <span>
                    Deleted at:{' '}
                    {selectedNote.deletedAt?.toDate().toLocaleString()}
                  </span>
                ) : (
                  <span>
                    Created at{' '}
                    {selectedNote.createdAt?.toDate().toLocaleString()}
                  </span>
                )}
              </div>
              <div className='selected-note-save-btn'>
                <button onClick={handleUpdateNote}>Save</button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default SelectedNote;
