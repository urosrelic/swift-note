import { Check } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useFirebase from '../../../hooks/useFirebase';
import './DrawerOption.css';

interface DrawerOptionProps {
  iconPath: string;
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  labelId?: string;
  labelName: string;
  url?: string | null;
  onClick: () => void;
}

const DrawerOption = ({
  iconPath,
  editMode,
  setEditMode,
  labelId,
  labelName,
  url,
  onClick,
}: DrawerOptionProps) => {
  // * States
  const [inputValue, setInputValue] = useState(labelName);

  // * Hooks
  const { currentUser } = useAuth();
  const { deleteLabel, updateLabelName } = useFirebase(currentUser);

  // * Handlers
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
          <div onClick={handleRemove}>
            <IconButton
              sx={{
                padding: '0.3rem',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: '#ffffff1a',
                },
              }}
            >
              <DeleteIcon sx={{ color: '#dde6ed' }} />
            </IconButton>
          </div>
          <input
            type='text'
            value={inputValue}
            onChange={handleChange}
            className='drawer-option-input'
          />

          <IconButton
            onClick={handleUpdateLabel}
            sx={{
              padding: '0.3rem',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: '#ffffff1a',
              },
            }}
          >
            <Check sx={{ color: '#dde6ed' }} />
          </IconButton>
        </div>
      </div>
    );
  };

  const renderReadMode = () => {
    if (url) {
      return (
        <Link className='drawer-option' to={url} onClick={onClick}>
          <img className='drawer-option-icon' src={iconPath} alt={labelName} />
          <span>{labelName}</span>
        </Link>
      );
    } else {
      return (
        <div className='drawer-option' onClick={onClick}>
          <img className='drawer-option-icon' src={iconPath} alt={labelName} />
          <span>{labelName}</span>
        </div>
      );
    }
  };

  return editMode ? renderEditMode() : renderReadMode();
};

export default DrawerOption;
