import BackspaceIcon from '@mui/icons-material/Backspace';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import useFirebase from '../../../../../hooks/useFirebase';
import { LabelType } from '../../../../../types/LabelType';
import './NoteLabel.css';

interface NoteLabelProps {
  label: LabelType;
  noteId: string;
}

const NoteLabel = ({ label, noteId }: NoteLabelProps) => {
  // * States
  const [hover, setHover] = useState<boolean>(false);

  const { currentUser } = useAuth();
  const { removeLabelFromNote } = useFirebase(currentUser);

  const handleRemoveLabel = () => {
    removeLabelFromNote(noteId, label.labelId);
  };

  useEffect(() => {
    console.log(noteId);
  });

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
          <div className='note-label-remove-btn' onClick={handleRemoveLabel}>
            <BackspaceIcon sx={{ marginLeft: '0.1rem', fontSize: '1rem' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteLabel;
