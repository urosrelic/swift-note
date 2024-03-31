import { useState } from 'react';
import Fab from '../../components/FAB/Fab';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
import Notes from '../../components/Notes/Notes';
import { ModalProvider } from '../../context/ModalContext';
const Home = () => {
  const [gridView, setGridView] = useState<boolean>(true);

  return (
    <ModalProvider>
      <div className='home'>
        <Navbar gridView={gridView} setGridView={setGridView} />
        <Notes gridView={gridView} />
        <Modal>
          <span className='modal-title'>Login</span>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button className='login-btn'>Login</button>
        </Modal>
        <Fab />
      </div>
    </ModalProvider>
  );
};

export default Home;
