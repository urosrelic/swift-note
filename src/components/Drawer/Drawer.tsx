import './Drawer.css';

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
          <div className='drawer-option'>
            <img src='/note.svg' />
            <span>Notes</span>
          </div>
          <div className='drawer-option'>
            <img src='/archive.svg' />
            <span>Archived</span>
          </div>
          <div className='drawer-option'>
            <img src='/trash.svg' />
            <span>Deleted</span>
          </div>
        </div>
        <hr className='separator'></hr>

        <div className='drawer-options'>
          <span className='drawer-options-heading'>Labels</span>
          {/* HERE ADD EXISTING LABELS, ex: load from database */}
          <div className='drawer-option'>
            <img src='/label.svg' />
            <span>Label #1</span>
          </div>
          <div className='drawer-option'>
            <img src='/edit.svg' />
            <span>Create a label</span>
          </div>
        </div>
        <hr className='separator'></hr>
        <div className='drawer-options'>
          <div className='drawer-option'>
            <img src='/settings.svg' />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
