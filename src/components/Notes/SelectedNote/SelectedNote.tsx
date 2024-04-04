import React from 'react';
import { NoteType } from '../../../types/NoteType';
import Modal from '../../Styled/Modal.styled';
import './SelectedNote.css';

interface SelectedNoteProps {
  selectedNote: NoteType | null;
  isModalOpen: boolean;
  closeModalHandler: () => void;
}

const SelectedNote: React.FC<SelectedNoteProps> = ({
  selectedNote,
  isModalOpen,
  closeModalHandler,
}) => {
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
                {selectedNote.title ? (
                  <h1>{selectedNote.title}</h1>
                ) : (
                  <h1>No Title</h1>
                )}
              </div>
              <div className='selected-note-content'>
                {selectedNote.content ? (
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
                    {selectedNote.content}
                  </textarea>
                ) : (
                  <h2>No content</h2>
                )}
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
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default SelectedNote;
