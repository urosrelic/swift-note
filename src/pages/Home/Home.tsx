import { useState } from 'react';
import Fab from '../../components/FAB/Fab';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
import Notes from '../../components/Notes/Notes';
import { ModalProvider } from '../../context/ModalContext';

const Home = () => {
  const [gridView, setGridView] = useState<boolean>(true);
  const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);

  const loginModal = () => (
    <Modal>
      <span className='modal-title'>Login</span>
      <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' />
      <button className='modal-btn'>Login</button>
      <div className='modal-redirect'>
        <p>Don't have an account?</p>
        <p onClick={() => setIsRegisterModal(true)}>
          Click <span>here</span> to register
        </p>
      </div>
    </Modal>
  );

  const registerModal = () => (
    <Modal>
      <span className='modal-title'>Register</span>
      <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' />
      <input type='password' placeholder='Confirm password' />
      <button className='modal-btn'>Register</button>
      <div className='modal-redirect'>
        <p>Already have an account?</p>
        <p onClick={() => setIsRegisterModal(false)}>
          Click <span>here</span> to login
        </p>
      </div>
    </Modal>
  );

  return (
    <ModalProvider>
      <div className='home'>
        <Navbar gridView={gridView} setGridView={setGridView} />
        <Notes gridView={gridView} />
        {isRegisterModal ? registerModal() : loginModal()}
        <Fab />
      </div>
    </ModalProvider>
  );
};

export default Home;
