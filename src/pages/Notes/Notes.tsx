// Notes.js
import NotesList from '../../components/Notes/NotesList';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import './Notes.css';

const Notes = ({ gridView }: GridProps) => {
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);

  const sortedNotes = notes
    ? [...notes].sort((a, b) => b.createdAt - a.createdAt)
    : [];

  const pinnedNotes = sortedNotes.filter(
    (note) => note.pinned && !note.archived
  );
  const otherNotes = sortedNotes.filter(
    (note) => !note.pinned && !note.archived
  );

  return (
    <>
      <div className='pinned-notes'>
        <span className='notes-section-title'>Pinned Notes</span>
        <NotesList notes={pinnedNotes} gridView={gridView} loading={loading} />
      </div>
      <div className='other-notes'>
        <span className='notes-section-title'>Other notes</span>
        <NotesList notes={otherNotes} gridView={gridView} loading={loading} />
      </div>
    </>
  );
};

export default Notes;
