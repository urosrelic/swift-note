import { useMediaQuery } from '@uidotdev/usehooks';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import Note from './Note';
import './Notes.css';

const Notes = ({ gridView }: GridProps) => {
  const notesClassName = gridView ? 'grid-view' : 'list-view';

  const largerScreen = useMediaQuery('only screen and (min-width: 452px)');

  const { currentUser } = useAuth();

  const { notes } = useFirebase(currentUser);

  const smallScreenLayout = () => {
    if (!notes || notes.length === 0) {
      return (
        <div className='add-note'>
          <span>No notes</span>
        </div>
      );
    } else {
      return (
        <div className='notes grid-view'>
          {notes.map((note) => (
            <Note
              key={note.noteId}
              noteId={note.noteId}
              title={note.title}
              createdAt={note.createdAt}
              content={note.content}
            />
          ))}
        </div>
      );
    }
  };

  const largerScreenLayout = () => {
    if (!notes || notes.length === 0) {
      return (
        <div className='add-note'>
          <span>No notes</span>
        </div>
      );
    } else {
      return (
        <div className={`notes ${notesClassName}`}>
          {notes.map((note) => (
            <Note
              key={note.noteId}
              title={note.title}
              createdAt={note.createdAt}
              content={note.content}
            />
          ))}
        </div>
      );
    }
  };

  return largerScreen ? largerScreenLayout() : smallScreenLayout();
};

export default Notes;
