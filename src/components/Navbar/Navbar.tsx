import { GridProps } from '../../utils/GridProps';
import './Navbar.css';

const Navbar = ({ gridView, setGridView }: GridProps) => {
  const layoutViewIconPath = gridView ? '/list_view.svg' : '/grid_view.svg';

  const handleButtonClick = () => {
    setGridView?.(!gridView);
  };

  const mobileLayout = () => {
    return (
      <div className='navbar'>
        <div className='navbar-items'>
          <div className='navbar-icon'>
            <img src='/menu.svg' className='menu-icon' />
          </div>
          <div className='navbar-search'>
            <input type='text' placeholder='Search your notes' />
          </div>
          <div className='layout-view-button' onClick={handleButtonClick}>
            <img src={layoutViewIconPath} className='account-icon' />
          </div>
          <div className='navbar-icon'>
            <img src='/account.svg' className='account-icon' />
          </div>
        </div>
      </div>
    );
  };

  return mobileLayout();
};

export default Navbar;
