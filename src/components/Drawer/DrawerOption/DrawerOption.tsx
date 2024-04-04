import { Link } from 'react-router-dom';
import './DrawerOption.css';

interface DrawerOptionProps {
  iconPath: string;
  label: string;
  url?: string | null;
  onClick: () => void;
}

const DrawerOption = ({ iconPath, label, url, onClick }: DrawerOptionProps) => {
  if (url) {
    return (
      <Link className='drawer-option' to={url} onClick={onClick}>
        <img className='drawer-option-icon' src={iconPath} alt={label} />
        <span>{label}</span>
      </Link>
    );
  } else {
    return (
      <div className='drawer-option' onClick={onClick}>
        <img className='drawer-option-icon' src={iconPath} alt={label} />
        <span>{label}</span>
      </div>
    );
  }
};

export default DrawerOption;
