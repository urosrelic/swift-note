import './DrawerOption.css';
interface DrawerOptionProps {
  iconPath: string;
  label: string;
}
const DrawerOption = ({ iconPath, label }: DrawerOptionProps) => {
  return (
    <div className='drawer-option'>
      <img className='drawer-option-icon' src={iconPath} />
      <label>{label}</label>
    </div>
  );
};

export default DrawerOption;
