import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import Modal from '../../../../components/Styled/Modal.styled';
import { useAuth } from '../../../../hooks/useAuth';
import useFirebase from '../../../../hooks/useFirebase';
import useSelectedNote from '../../../../hooks/useSelectedNote';
import './ColorPicker.css';

interface ColorPickerProps {
  isModalOpen: boolean;
  closeModalHandler: () => void;
}

const defaultColor: string = '#d3e3fd';

const colors = [
  '#77172e',
  '#692b17',
  '#7c4a03',
  '#0c625d',
  '#256377',
  '#472e5b',
  '#6c394f',
  '#232427',
];

const ColorPicker = ({ isModalOpen, closeModalHandler }: ColorPickerProps) => {
  // * Hooks
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
            <div
              className='color-option reset'
              onClick={() =>
                selectedNote?.noteId &&
                colorNote(selectedNote.noteId, defaultColor)
              }
            >
              <FormatColorResetIcon />
            </div>
            {colors.map((color, index) => (
              <div
                key={index}
                className='color-option'
                style={{ backgroundColor: color }}
                onClick={() =>
                  selectedNote?.noteId && colorNote(selectedNote?.noteId, color)
                }
              ></div>
            ))}
          </div>
        </div>
      </Modal>
    )
  );
};

export default ColorPicker;
