import LabelIcon from '@mui/icons-material/Label';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotesList from '../../components/Notes/NoteList/NoteList';
import SelectedNote from '../../components/Notes/SelectedNote/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { LabelType } from '../../types/LabelType';
import { NoteType } from '../../types/NoteType';
import './LabeledNote.css';

const LabeledNote = ({ gridView }: GridProps) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState<LabelType | null>(null);
  const [labeledNotes, setLabeledNotes] = useState<NoteType[] | null>(null);

  // Hooks
  const { currentUser } = useAuth();
  const { notes, loading, fetchLabelDataById } = useFirebase(currentUser);
  const { setSelectedNote } = useSelectedNote();
  const { labelId } = useParams();

  useEffect(() => {
    // console.log('Fetching label data...');
    const fetchLabel = async () => {
      if (labelId && currentUser) {
        try {
          const fetchedLabel = await fetchLabelDataById(labelId);
          // console.log('Fetched label:', fetchedLabel);
          setLabel(fetchedLabel);
        } catch (error) {
          // console.error('Error fetching label data:', error);
        }
      }
    };

    fetchLabel();
  }, [labelId, currentUser]);

  useEffect(() => {
    if (label && notes) {
      // console.log('Filtering notes based on selected label...');
      const sortedNotes = [...notes].sort(
        (a, b) =>
          b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      );
      const labeledNotes = sortedNotes.filter(
        (note) =>
          note.labels.includes(label.labelId) && !note.deleted && !note.archived
      );
      setLabeledNotes(labeledNotes);
    }
  }, [label, notes]);

  useEffect(() => {
    console.log(label);
  }, [label, labeledNotes]);

  if (!label || !labeledNotes) {
    return (
      <div className='labeled-note-loading'>
        <span>Loading label information ...</span>
        <CircularProgress />
      </div>
    );
  }

  // Handlers
  const handleNoteClick = (note: NoteType) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <>
      <div className='labeled-notes'>
        <div
          className={`labeled-notes-section ${
            gridView ? 'grid-view' : 'list-view'
          }`}
        >
          <div className='labeled-notes-title'>
            <LabelIcon sx={{ fontSize: '1.8rem', marginRight: '0.5rem' }} />
            {label ? label.labelName : 'No label data'}
          </div>
        </div>
        {labeledNotes.length > 0 ? (
          <NotesList
            notes={labeledNotes}
            gridView={gridView}
            loading={loading}
            handleNoteClick={handleNoteClick}
          />
        ) : (
          <span
            className={`empty-notes ${gridView ? 'grid-view' : 'list-view'}`}
          >
            No notes
          </span>
        )}
      </div>
      <SelectedNote
        isModalOpen={isModalOpen}
        closeModalHandler={handleCloseModal}
      />
    </>
  );
};

export default LabeledNote;
