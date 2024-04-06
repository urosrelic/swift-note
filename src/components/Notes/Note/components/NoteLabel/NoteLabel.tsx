import BackspaceIcon from '@mui/icons-material/Backspace';
import { useState } from 'react';
import { LabelType } from '../../../../../types/LabelType';
import './NoteLabel.css';
interface NoteLabelProps {
  label: LabelType;
}

const NoteLabel = ({ label }: NoteLabelProps) => {
  // * States
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className='note-label'
      key={label.labelId}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='note-label-name'>{label.labelName}</div>
      {hover ? (
        <div className='note-label-close-btn'>
          <BackspaceIcon sx={{ marginLeft: '0.3rem', fontSize: '1.1rem' }} />
        </div>
      ) : null}
    </div>
  );
};

export default NoteLabel;
