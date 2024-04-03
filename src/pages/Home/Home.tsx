import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Fab from '../../components/FAB/Fab';
import Modal from '../../components/Modal/Modal'; // Import Modal component
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import { Note } from '../../utils/types/NoteType';

const Home = ({ gridView, setGridView }: GridProps) => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  const { currentUser } = useAuth();
  const { addNote } = useFirebase(currentUser);

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
    const noteData: Omit<Note, 'noteId'> = {
      archived: false,
      color: 'white',
      content: noteContent,
      createdAt: firebase.firestore.Timestamp.now(),
      labels: [],
      pinned: false,
      title: noteTitle,
      userId: currentUser.uid,
    };

    addNote(noteData);

    setNoteTitle('');
    setNoteContent('');
    closeModalHandler();
  };

  const renderNoteModal = () => {
    return (
      <>
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
        <button className='modal-btn' onClick={handleAddNote}>
          Add
        </button>
      </>
    );
  };

  const renderChecklistModal = () => {
    return (
      <div className='checklist-modal'>
        <></>
      </div>
    );
  };

  return (
    <div className='home'>
      <Navbar gridView={gridView} setGridView={setGridView} />
      <Outlet />
      <Fab openModal={openModalHandler} />
      {openModal && ( // Render modal based on the state
        <Modal closeModalHandler={closeModalHandler}>
          {openModal === 'add' && renderNoteModal()}
          {openModal === 'checklist' && renderChecklistModal()}
        </Modal>
      )}
    </div>
  );
};

export default Home;
