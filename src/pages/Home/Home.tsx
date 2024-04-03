import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab/Fab';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FloatingActionButton from '../../components/FAB/FloatingActionButton';
import Navbar from '../../components/Navbar/Navbar';
import Modal from '../../components/Styled/Modal.styled';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import { NoteType } from '../../utils/types/NoteType';

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

    setNoteTitle('');
    setNoteContent('');
    closeModalHandler();
  };

  const muiFabStyles = {
    backgroundColor: '#233549',
    '&:hover': {
      backgroundColor: '#031525',
    },
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
        <Fab
          className='modal-btn'
          color='primary'
          aria-label='add'
          onClick={handleAddNote}
          sx={{ ...muiFabStyles }}
        >
          <AddIcon />
        </Fab>
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
      <FloatingActionButton openModal={openModalHandler} />
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
