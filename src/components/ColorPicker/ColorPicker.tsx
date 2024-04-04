import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import useSelectedNote from '../../hooks/useSelectedNote';
import Modal from '../Styled/Modal.styled';
import './ColorPicker.css';

interface ColorPickerProps {
  isModalOpen: boolean;
  closeModalHandler: () => void;
}

const ColorPicker = ({ isModalOpen, closeModalHandler }: ColorPickerProps) => {
  const colors = [
    '#ff7f0e',
    '#2ca02c',
    '#1f77b4',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
  ];

  const { currentUser } = useAuth();
  const { selectedNote } = useSelectedNote();
  const { colorNote } = useFirebase(currentUser);

  return (
    isModalOpen && (
      <Modal
        closeModalHandler={closeModalHandler}
        style={{
          modalContainer: {
            width: '90%',
            maxWidth: '500px',
          },
        }}
      >
        <div className='color-picker-container'>
          <h2>Select a color</h2>
          <div className='color-picker-options'>
            {colors.map((color, index) => (
              <div
                key={index}
                className='color-option'
                style={{ backgroundColor: color }}
                onClick={() => colorNote(selectedNote.noteId, color)}
              ></div>
            ))}
          </div>
        </div>
      </Modal>
    )
  );
};

export default ColorPicker;
