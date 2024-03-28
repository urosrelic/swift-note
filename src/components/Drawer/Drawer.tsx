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
      </div>
    </div>
  );
};

export default Drawer;
