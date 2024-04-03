import { useClickOutside } from '../../hooks/useClickOutside';
import './Drawer.css';
import DrawerOption from './DrawerOption';

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({ openDrawer, setOpenDrawer }: DrawerProps) => {
  const drawerClass = openDrawer ? 'open' : '';

  const handleClose = () => {
    setOpenDrawer(!openDrawer);
  };

  const domNode = useClickOutside<HTMLDivElement>(setOpenDrawer);

  return (
    <div className={`drawer ${drawerClass}`} ref={domNode}>
      <div className='drawer-contents'>
        <div className='logo'>
          <span>SwiftNote</span>
          <img src='/close.svg' onClick={handleClose} />
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
          {/* HERE ADD EXISTING LABELS, ex: load from database */}
          <DrawerOption
            iconPath='/label.svg'
            label='Label #1'
            onClick={handleClose}
          />
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
