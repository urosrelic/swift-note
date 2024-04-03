import NotesList from '../../components/Notes/NotesList';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { GridProps } from '../../utils/types/GridProps';
import './Archived.css';

const Archived = ({ gridView }: GridProps) => {
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);

  const sortedNotes = notes
    ? [...notes].sort((a, b) => b.createdAt - a.createdAt)
    : [];
  const archivedNotes = sortedNotes?.filter((note) => note.archived);

  return (
    <div className='archived-notes'>
      <span className='archived-notes-section-title'>Archived Notes</span>
      <NotesList notes={archivedNotes} gridView={gridView} loading={loading} />
    </div>
  );
};

export default Archived;
