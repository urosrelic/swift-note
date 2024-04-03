import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { NoteType } from '../../utils/types/NoteType';
import Note from './Note';

import './NotesList.css';

interface NoteListProps {
  notes: NoteType[];
  gridView: boolean;
  loading: boolean;
}

const NotesList = ({ notes, gridView, loading }: NoteListProps) => {
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
