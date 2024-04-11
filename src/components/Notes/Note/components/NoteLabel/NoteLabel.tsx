import { IconCircleMinus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { removeLabelFromNote } = useFirebase(currentUser);

  const handleRemoveLabel = () => {
    removeLabelFromNote(noteId, label.labelId);
  };

  const handleRedirect = () => {
    navigate(`/home/labeled/${label.labelId}`);
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
        <div className='note-label-name' onClick={handleRedirect}>
          {label.labelName}
        </div>
        {hover && (
          <div className='note-label-remove-btn' onClick={handleRemoveLabel}>
            <IconCircleMinus size={16} style={{ marginLeft: '0.1rem' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteLabel;
