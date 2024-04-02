import { useState } from 'react';
import Fab from '../../components/FAB/Fab';
import Modal from '../../components/Modal/Modal'; // Import Modal component
import Navbar from '../../components/Navbar/Navbar';
import Notes from '../../components/Notes/Notes';

const Home = () => {
  const [gridView, setGridView] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<string | null>(null); // State to manage currently open modal

  const openModalHandler = (modalType: string) => {
    setOpenModal(modalType);
  };

  const closeModalHandler = () => {
    setOpenModal(null);
  };

  // Function to automatically resize the textarea
  const autoResizeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const renderNoteModal = () => {
    return (
      <>
        <input type='text' name='note-title' placeholder='Title' />
        <textarea
          name='note-content'
          placeholder='Content...'
          onInput={autoResizeTextarea}
        />
        <button className='modal-btn'>Add</button>
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
      <Notes gridView={gridView} />
      <Fab openModal={openModalHandler} />{' '}
      {/* Pass down the handler function */}
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
