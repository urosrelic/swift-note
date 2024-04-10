import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useClickOutside } from '../../../hooks/useClickOutside';
import useFirebase from '../../../hooks/useFirebase';
import { LabelType } from '../../../types/LabelType';
import DrawerOption from '../DrawerOption/DrawerOption';
import './Drawer.css';

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({ openDrawer, setOpenDrawer }: DrawerProps) => {
  const drawerClass = openDrawer ? 'open' : '';
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newLabelName, setNewLabelName] = useState<string | null>(null);

  // * Hooks
  const { currentUser } = useAuth();
  const { labels, createLabel } = useFirebase(currentUser);
  const navigate = useNavigate();
  const domNode = useClickOutside<HTMLDivElement>(setOpenDrawer);

  // * Handlers
  const handleClose = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLabelName(e.target.value);
  };

  const handleSetEditMode = () => {
    setEditMode(!editMode);
  };

  const handleLabelSelect = (label: LabelType) => {
    handleClose();
    navigate(`/home/labeled/${label.labelId}`);
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

  const editModeLayout = () => {
    return (
      <div className={`drawer ${drawerClass}`} ref={domNode}>
        <div className='drawer-contents'>
          <div className='logo'>
            <div className='logo-container'>
              <img src='/swift-note-logo.png' />
            </div>
          </div>
          <div className='drawer-options'>
            <DrawerOption
              iconPath='/note.svg'
              labelName='Notes'
              url='/home/notes'
              onClick={handleClose}
            />
            <DrawerOption
              iconPath='/archive.svg'
              labelName='Archived'
              url='/home/archived'
              onClick={handleClose}
            />
            <DrawerOption
              iconPath='/trash.svg'
              labelName='Deleted'
              url='/home/deleted'
              onClick={handleClose}
            />
          </div>

          <hr className='separator'></hr>

          <div className='drawer-options'>
            <span className='drawer-options-heading'>Labels</span>
            <DrawerOption
              iconPath={editMode ? '/close.svg' : '/edit.svg'}
              labelName={editMode ? 'Cancel' : 'Edit labels'}
              onClick={handleSetEditMode}
            />
            {labels &&
              labels.map((label) => (
                <DrawerOption
                  key={label.labelId}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  labelId={label.labelId}
                  iconPath='/label.svg'
                  labelName={label.labelName}
                  onClick={() => handleLabelSelect(label)}
                />
              ))}
          </div>
        </div>
      </div>
    );
  };

  const readModeLayout = () => {
    return (
      <div className={`drawer ${drawerClass}`} ref={domNode}>
        <div className='drawer-contents'>
          <div className='logo'>
            <div className='logo-container'>
              <img src='/swift-note-logo.png' />
            </div>
          </div>
          <div className='drawer-options'>
            <DrawerOption
              iconPath='/note.svg'
              labelName='Notes'
              url='/home/notes'
              onClick={handleClose}
            />
            <DrawerOption
              iconPath='/archive.svg'
              labelName='Archived'
              url='/home/archived'
              onClick={handleClose}
            />
            <DrawerOption
              iconPath='/trash.svg'
              labelName='Deleted'
              url='/home/deleted'
              onClick={handleClose}
            />
          </div>

          <hr className='separator'></hr>

          <div className='drawer-options'>
            <span className='drawer-options-heading'>Labels</span>
            <DrawerOption
              iconPath={editMode ? '/close.svg' : '/edit.svg'}
              labelName={editMode ? 'Cancel' : 'Edit labels'}
              onClick={handleSetEditMode}
            />
            <div className='drawer-add-new-label'>
              <input
                type='text'
                placeholder='Create a new label...'
                value={newLabelName || ''}
                onChange={handleInputChange}
              />
              <IconButton
                onClick={createNewLabel}
                sx={{
                  padding: '0.3rem',

                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: '#ffffff1a',
                  },
                }}
              >
                <Add sx={{ color: '#dde6ed' }} />
              </IconButton>
            </div>
            {labels &&
              labels.map((label) => (
                <DrawerOption
                  key={label.labelId}
                  iconPath='/label.svg'
                  labelName={label.labelName}
                  onClick={() => handleLabelSelect(label)}
                />
              ))}
          </div>
        </div>
      </div>
    );
  };

  return editMode ? editModeLayout() : readModeLayout();
};

export default Drawer;
