import { ChangeEvent, useState } from 'react';
import Modal from '../../../../components/Styled/Modal.styled';
import { useAuth } from '../../../../hooks/useAuth';
import useFirebase from '../../../../hooks/useFirebase';
import useSelectedNote from '../../../../hooks/useSelectedNote';
import { LabelType } from '../../../../types/LabelType';
import './LabelPicker.css';

interface LabelPickerProps {
  isModalOpen: boolean;
  closeModalHandler: () => void;
}

const LabelPicker = ({ isModalOpen, closeModalHandler }: LabelPickerProps) => {
  // * States
  const [newLabelName, setNewLabelName] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  // * Hooks
  const { currentUser } = useAuth();
  const { labels, createLabel, updateNoteLabel } = useFirebase(currentUser);
  const { selectedNote } = useSelectedNote();

  // * Handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLabelName(e.target.value);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(e.target.value);
  };

  const createNewLabel = () => {
    if (newLabelName !== null && newLabelName.trim() !== '') {
      const newLabel: Omit<LabelType, 'labelId'> = {
        labelName: newLabelName,
        userId: currentUser?.uid || '',
      };
      createLabel(newLabel);
      setNewLabelName(null);
    } else {
      return;
    }
  };

  const addLabelToNote = (labelId: string) => {
    if (selectedNote?.noteId) {
      updateNoteLabel(selectedNote.noteId, labelId);
      closeModalHandler();
    }
  };

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
        <div className='label-picker-container'>
          <h2>Select a label</h2>
          <div className='label-picker-options'>
            {labels?.length === 0 ? (
              <>No created labels</>
            ) : (
              <>
                <h4>Available labels</h4>
                <select value={selectedLabel} onChange={handleSelectChange}>
                  <option value='' disabled hidden>
                    Choose a label
                  </option>
                  {labels?.map((label) => (
                    <option key={label.labelId} value={label.labelId}>
                      {label.labelName}
                    </option>
                  ))}
                </select>
                <button onClick={() => addLabelToNote(selectedLabel)}>
                  Add Label
                </button>
              </>
            )}
          </div>
          <div className='label-picker-add-label'>
            <h4>Create a new label</h4>
            <input
              type='text'
              placeholder='Label name...'
              value={newLabelName || ''}
              onChange={handleInputChange}
            ></input>
            <button onClick={createNewLabel}>Create</button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default LabelPicker;
