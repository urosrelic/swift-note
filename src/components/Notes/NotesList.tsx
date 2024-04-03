import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { NoteType } from '../../utils/types/NoteType';
import Note from './Note';

import './NotesList.css';

interface NoteListProps {
  notes: NoteType[];
  gridView: boolean;
  loading: boolean;
  handleNoteClick?: (note: NoteType) => void;
}

const NotesList = ({
  notes,
  gridView,
  loading,
  handleNoteClick,
}: NoteListProps) => {
  const handleClick = (note: NoteType) => {
    if (handleNoteClick) {
      handleNoteClick(note);
    }
  };

  return (
    <div className={`notes-list ${gridView ? 'grid-view' : 'list-view'}`}>
      {loading ? (
        <div className='loading-indicator'>
          <CircularProgress />
        </div>
      ) : (
        <>
          {notes.length > 0 ? (
            notes.map((note) => (
              <Note
                key={note.noteId}
                noteId={note.noteId}
                title={note.title}
                createdAt={note.createdAt}
                deletedAt={note.deletedAt}
                content={note.content}
                pinned={note.pinned}
                archived={note.archived}
                deleted={note.deleted}
                color={note.color}
                labels={note.labels}
                handleNoteClick={() => handleClick(note)}
              />
            ))
          ) : (
            <div className='add-note'>
              <span>No notes</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotesList;
