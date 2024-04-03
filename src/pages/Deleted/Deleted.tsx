import NotesList from '../../components/Notes/NotesList';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import './Deleted.css';
const Deleted = ({ gridView }: GridProps) => {
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);

  const sortedNotes = notes
    ? [...notes].sort((a, b) => b.createdAt - a.createdAt)
    : [];
  const deletedNotes = sortedNotes?.filter((note) => note.deleted);

  return (
    <div className='deleted-notes'>
      <span className='deleted-notes-section-title'>Deleted notes</span>
      <button className='deleted-notes-empty-btn'>Empty</button>
      <NotesList notes={deletedNotes} gridView={gridView} loading={loading} />
    </div>
  );
};

export default Deleted;
