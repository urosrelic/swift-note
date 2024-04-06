import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useClickOutside } from '../../../hooks/useClickOutside';
import useFirebase from '../../../hooks/useFirebase';
import { useSelectedLabel } from '../../../hooks/useSelectedLabel';
import { LabelType } from '../../../types/LabelType';
import DrawerOption from '../DrawerOption/DrawerOption';
import './Drawer.css';

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({ openDrawer, setOpenDrawer }: DrawerProps) => {
  const drawerClass = openDrawer ? 'open' : '';

  // * Hooks
  const { currentUser } = useAuth();
  const { labels } = useFirebase(currentUser);
  const { setSelectedLabel } = useSelectedLabel();
  const navigate = useNavigate();
  const domNode = useClickOutside<HTMLDivElement>(setOpenDrawer);

  // * Handlers
  const handleClose = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLabelSelect = (label: LabelType) => {
    handleClose();
    setSelectedLabel(label);
    navigate(`/home/labeled/${label.labelId}`);
  };

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
            label='Notes'
            url='/home/notes'
            onClick={handleClose}
          />
          <DrawerOption
            iconPath='/archive.svg'
            label='Archived'
            url='/home/archived'
            onClick={handleClose}
          />
          <DrawerOption
            iconPath='/trash.svg'
            label='Deleted'
            url='/home/deleted'
            onClick={handleClose}
          />
        </div>

        <hr className='separator'></hr>

        <div className='drawer-options'>
          <span className='drawer-options-heading'>Labels</span>
          {labels &&
            labels.map((label) => (
              <DrawerOption
                key={label.labelId}
                iconPath='/label.svg'
                label={label.labelName}
                onClick={() => handleLabelSelect(label)}
              />
            ))}

          <DrawerOption
            iconPath='/edit.svg'
            label='Create a label'
            onClick={handleClose}
          />
        </div>
        <hr className='separator'></hr>
        <div className='drawer-options'>
          <DrawerOption
            iconPath='/settings.svg'
            label='Settings'
            url='/home/settings'
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
