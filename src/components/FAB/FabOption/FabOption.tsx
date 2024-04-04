interface FabOptionProps {
  iconPath: string;
  onClick: () => void;
}

import './FabOption.css';

const FabOption = ({ iconPath, onClick }: FabOptionProps) => {
  return (
    <div className='fab-option' onClick={onClick}>
      <img src={iconPath} />
    </div>
  );
};

export default FabOption;
