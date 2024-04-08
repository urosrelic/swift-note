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
      <div className='note-label-container'>
        <div className='note-label-name'>{label.labelName}</div>
        {hover && (
          <BackspaceIcon
            className='note-label-close-btn'
            sx={{ marginLeft: '0.1rem', fontSize: '1rem' }}
          />
        )}
      </div>
    </div>
  );
};

export default NoteLabel;
