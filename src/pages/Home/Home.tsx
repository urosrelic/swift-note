import { useState } from 'react';
import Fab from '../../components/FAB/Fab';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
import Notes from '../../components/Notes/Notes';
import { ModalProvider } from '../../context/ModalContext';
import { useModal } from '../../hooks/useModal';

const Home = () => {
  const [gridView, setGridView] = useState<boolean>(true);
  const { isOpen, closeModal } = useModal();
  return (
    <ModalProvider>
      <div className='home'>
        <Navbar gridView={gridView} setGridView={setGridView} />
        <Notes gridView={gridView} />
        <Fab />
        {isOpen && (
          <Modal>
            {/* Content for the modal */}
            <p>This is the modal content.</p>
          </Modal>
        )}
      </div>
    </ModalProvider>
  );
};

export default Home;
