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

  const sortedNotes = notes
    ? [...notes].sort((a, b) => b.createdAt - a.createdAt)
    : [];

  const pinnedNotes = sortedNotes.filter((note) => note.pinned);
  const otherNotes = sortedNotes.filter((note) => !note.pinned);

  const smallScreenLayout = () => {
    if (!notes || notes.length === 0) {
      return (
        <div className='add-note'>
          <span>No notes</span>
        </div>
      );
    } else {
      return (
        <>
          <div className='pinned-notes'>
            <span className='notes-section-title'>Pinned Notes</span>
            <div className={`notes grid-view`}>
              {pinnedNotes.length > 0 ? (
                pinnedNotes.map((note) => (
                  <Note
                    key={note.noteId}
                    noteId={note.noteId}
                    title={note.title}
                    createdAt={note.createdAt}
                    content={note.content}
                    pinned={note.pinned}
                  />
                ))
              ) : (
                <div className='add-note'>
                  <span>No pinned notes</span>
                </div>
              )}
            </div>
            <div className='other-notes'>
              <span className='notes-section-title'>Other notes</span>
              <div className={`notes ${notesClassName}`}>
                {otherNotes.length > 0 ? (
                  otherNotes.map((note) => (
                    <Note
                      key={note.noteId}
                      noteId={note.noteId}
                      title={note.title}
                      createdAt={note.createdAt}
                      content={note.content}
                      pinned={note.pinned}
                    />
                  ))
                ) : (
                  <div className='add-note'>
                    <span>No other notes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
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
        <>
          <div className='pinned-notes'>
            <span className='notes-section-title'>Pinned Notes</span>
            <div className={`notes ${notesClassName}`}>
              {pinnedNotes.length > 0 ? (
                pinnedNotes.map((note) => (
                  <Note
                    key={note.noteId}
                    noteId={note.noteId}
                    title={note.title}
                    createdAt={note.createdAt}
                    content={note.content}
                    pinned={note.pinned}
                  />
                ))
              ) : (
                <div className='add-note'>
                  <span>No pinned notes</span>
                </div>
              )}
            </div>
            <div className='other-notes'>
              <span className='notes-section-title'>Other notes</span>
              <div className={`notes ${notesClassName}`}>
                {otherNotes.length > 0 ? (
                  otherNotes.map((note) => (
                    <Note
                      key={note.noteId}
                      noteId={note.noteId}
                      title={note.title}
                      createdAt={note.createdAt}
                      content={note.content}
                      pinned={note.pinned}
                    />
                  ))
                ) : (
                  <div className='add-note'>
                    <span>No other notes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return <>{largerScreen ? largerScreenLayout() : smallScreenLayout()}</>;
};

export default Notes;
