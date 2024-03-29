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

  return (
    <div className={`drawer ${drawerClass}`}>
      <div className='drawer-contents'>
        <div className='logo'>
          <span>SwiftNote</span>
          <img src='/close.svg' onClick={handleClose} />
        </div>
        <div className='drawer-options'>
          <DrawerOption iconPath='/note.svg' label='Notes' />
          <DrawerOption iconPath='/archive.svg' label='Archived' />
          <DrawerOption iconPath='/trash.svg' label='Deleted' />
        </div>
        <hr className='separator'></hr>

        <div className='drawer-options'>
          <span className='drawer-options-heading'>Labels</span>
          {/* HERE ADD EXISTING LABELS, ex: load from database */}
          <DrawerOption iconPath='/label.svg' label='Label #1' />
          <DrawerOption iconPath='/edit.svg' label='Create a label' />
        </div>
        <hr className='separator'></hr>
        <div className='drawer-options'>
          <DrawerOption iconPath='/settings.svg' label='Settings' />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
