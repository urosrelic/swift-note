import { useMediaQuery } from '@uidotdev/usehooks';
import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { GridProps } from '../../utils/types/GridProps';
import Note from './Note';
import './Notes.css';

const Notes = ({ gridView }: GridProps) => {
  const notesClassName = gridView ? 'grid-view' : 'list-view';

  const largerScreen = useMediaQuery('only screen and (min-width: 452px)');

  const { currentUser } = useAuth();

  const { notes } = useFetch(currentUser);

  const smallScreenLayout = () => {
    return (
      <div className='notes grid-view'>
        {notes &&
          notes.map((note) => (
            <Note
              key={note.noteId}
              title={note.title}
              createdAt={note.createdAt}
              content={note.content}
            />
          ))}
      </div>
    );
  };

  const largerScreenLayout = () => {
    return (
      <div className={`notes ${notesClassName}`}>
        {notes &&
          notes.map((note) => (
            <Note
              key={note.noteId}
              title={note.title}
              createdAt={note.createdAt}
              content={note.content}
            />
          ))}
      </div>
    );
  };

  return largerScreen ? largerScreenLayout() : smallScreenLayout();
};

export default Notes;
