interface FabOptionProps {
  option: {
    label: string;
    iconPath: string;
    onClick: () => void;
  };
}
import './FabOption.css';

const FabOption = ({ option }: FabOptionProps) => {
  return (
    <div className='fab-option' onClick={option.onClick}>
      <div className='fab-option-icon'>
        <img src={option.iconPath} />
      </div>
    </div>
  );
};

export default FabOption;
