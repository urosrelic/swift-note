import NotesList from '../../components/Notes/NotesList';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import './Deleted.css';
const Deleted = ({ gridView }: GridProps) => {
  const { currentUser } = useAuth();
  const { notes, loading, removeFromTrash } = useFirebase(currentUser);

  const sortedNotes = notes
    ? [...notes].sort(
        (a, b) =>
          b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      )
    : [];
  const deletedNotes = sortedNotes?.filter((note) => note.deleted);

  const handleEmptyTrash = async () => {
    await removeFromTrash(deletedNotes);
  };

  return (
    <div className='deleted-notes'>
      <span className='deleted-notes-section-title'>Deleted notes</span>
      {deletedNotes.length > 0 && (
        <button className='deleted-notes-empty-btn' onClick={handleEmptyTrash}>
          Empty
        </button>
      )}

      <NotesList notes={deletedNotes} gridView={gridView} loading={loading} />
    </div>
  );
};

export default Deleted;
