import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import FloatingActionButton from '../../components/FAB/FloatingActionButton/FloatingActionButton';
import Navbar from '../../components/Navbar/Navbar';
import Modal from '../../components/Styled/Modal.styled';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../types/GridProps';
import { NoteType } from '../../types/NoteType';
import './Home.css';

const Home = ({ gridView, setGridView }: GridProps) => {
  // States

  const [openModal, setOpenModal] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  // Hooks

  const { currentUser } = useAuth();
  const { addNote } = useFirebase(currentUser);
  const navigate = useNavigate();
  // Handlers

  const openModalHandler = (modalType: string) => {
    setOpenModal(modalType);
  };

  const closeModalHandler = () => {
    setOpenModal(null);
  };

  const autoResizeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteContent(event.target.value);
    autoResizeTextarea(event);
  };

  const handleAddNote = () => {
    if (currentUser) {
      const noteData: Omit<NoteType, 'noteId'> = {
        title: noteTitle,
        content: noteContent,
        userId: currentUser.uid,
        archived: false,
        pinned: false,
        deleted: false,
        createdAt: firebase.firestore.Timestamp.now(),
        deletedAt: null,
        color: '#d3e3fd',
        labels: [],
      };

      addNote(noteData);
      navigate('/home/notes');
      setNoteTitle('');
      setNoteContent('');
      closeModalHandler();
    }
  };

  // Style props

  const modalContainerStyles = {
    width: '90%',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    alignItems: 'flex-start',
    backgroundColor: '#d3e3fd',
  };

  // Render modal content

  const renderChecklistModal = () => {
    return (
      <div className='checklist-modal'>
        <h1 style={{ color: 'white' }}>Work in progress...</h1>
      </div>
    );
  };

  const renderNoteModal = () => {
    return (
      <div className='note-modal-container'>
        <input
          type='text'
          name='note-title'
          placeholder='Title'
          onChange={handleTitleChange}
        />
        <textarea
          name='note-content'
          placeholder='Content...'
          onChange={handleContentChange}
        />
        <div className='note-modal-container-date'>
          Today's date: {new Date().toLocaleDateString()}
        </div>
        <div className='modal-btn' onClick={handleAddNote}>
          <button>Add</button>
        </div>
      </div>
    );
  };

  return (
    <div className='home'>
      <Navbar gridView={gridView} setGridView={setGridView} />
      <Outlet />
      <FloatingActionButton openModal={openModalHandler} />
      {openModal && (
        <Modal
          closeModalHandler={closeModalHandler}
          style={{
            modalContainer: {
              ...(modalContainerStyles as React.CSSProperties),
            },
          }}
        >
          {openModal === 'add' && renderNoteModal()}
          {openModal === 'checklist' && renderChecklistModal()}
        </Modal>
      )}
    </div>
  );
};

export default Home;
