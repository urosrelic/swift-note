import { IconColorPickerOff } from '@tabler/icons-react';
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
  '#DBA979',
  '#73A9AD',
  '#7895B2',
  '#B0C5A4',
  '#A5DD9B',
  '#748E63',
  '#4F6F52',
  '#FFC0D9',
  '#E493B3',
  '#BEADFA',
  '#8E7AB5',
  '#867070',
  '#A86464',
  '#FD8A8A',
  '#85586F',
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
              <IconColorPickerOff />
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
