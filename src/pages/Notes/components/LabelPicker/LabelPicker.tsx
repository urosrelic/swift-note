import { useState } from 'react';
import Modal from '../../../../components/Styled/Modal.styled';
import { useAuth } from '../../../../hooks/useAuth';
import useFirebase from '../../../../hooks/useFirebase';
import { LabelType } from '../../../../types/LabelType';
import './LabelPicker.css';

interface LabelPickerProps {
  isModalOpen: boolean;
  closeModalHandler: () => void;
}

const LabelPicker = ({ isModalOpen, closeModalHandler }: LabelPickerProps) => {
  // * States
  const [newLabelName, setNewLabelName] = useState<string | null>(null);

  // * Hooks
  const { currentUser } = useAuth();
  const { labels, createLabel } = useFirebase(currentUser);

  // * Handlers
  const handleInputChange = (e) => {
    setNewLabelName(e.target.value);
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

                <select>
                  <option value='' selected disabled hidden>
                    Choose a label
                  </option>
                  {labels?.map((label) => (
                    <option key={label.labelId}>{label.labelName}</option>
                  ))}
                </select>
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
