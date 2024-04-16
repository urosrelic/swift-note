import { IconCheck, IconTrashX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useFirebase from '../../../hooks/useFirebase';
import './DrawerOption.css';

interface DrawerOptionProps {
  icon: React.ReactElement;
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  labelId?: string;
  labelName: string;
  url?: string | null;
  onClick: () => void;
}

const DrawerOption = ({
  icon,
  editMode,
  setEditMode,
  labelId,
  labelName,
  url,
  onClick,
}: DrawerOptionProps) => {
  const [inputValue, setInputValue] = useState(labelName);

  const { currentUser } = useAuth();
  const { deleteLabel, updateLabelName } = useFirebase(currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleRemove = () => {
    if (labelId) {
      deleteLabel(labelId);
      setInputValue('');
    }
  };

  const handleUpdateLabel = () => {
    if (labelId && setEditMode) {
      updateLabelName(labelId, inputValue);
      setEditMode(!editMode);
    }
  };

  const renderEditMode = () => {
    return (
      <div className='drawer-option-edit-mode'>
        <div className='drawer-option-edit-labels'>
          <IconTrashX
            color='#dde6ed'
            style={{ cursor: 'pointer' }}
            onClick={handleRemove}
          />

          <input
            type='text'
            value={inputValue}
            onChange={handleChange}
            className='drawer-option-input'
          />
          <IconCheck
            color='#dde6ed'
            style={{ cursor: 'pointer' }}
            onClick={handleUpdateLabel}
          />
        </div>
      </div>
    );
  };

  const renderReadMode = () => {
    if (url) {
      return (
        <Link className='drawer-option' to={url} onClick={onClick}>
          {icon}
          <span>{labelName}</span>
        </Link>
      );
    } else {
      return (
        <div className='drawer-option' onClick={onClick}>
          {icon}
          <span>{labelName}</span>
        </div>
      );
    }
  };

  return editMode ? renderEditMode() : renderReadMode();
};

export default DrawerOption;
