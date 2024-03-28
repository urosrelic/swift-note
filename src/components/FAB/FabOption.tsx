interface FabOptionProps {
  option: {
    iconPath: string;
    onClick: () => void;
  };
}
import './FabOption.css';

const FabOption = ({ option }: FabOptionProps) => {
  return (
    <div className='fab-option' onClick={option.onClick}>
      <img src={option.iconPath} />
    </div>
  );
};

export default FabOption;
