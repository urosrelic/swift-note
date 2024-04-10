import LabelIcon from '@mui/icons-material/Label';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotesList from '../../components/Notes/NoteList/NoteList';
import SelectedNote from '../../components/Notes/SelectedNote/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import { useColorPicker } from '../../hooks/useColorPicker';
import useFirebase from '../../hooks/useFirebase';
import { useLabelPicker } from '../../hooks/useLabelPicker';
import { useSearch } from '../../hooks/useSearch';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { LabelType } from '../../types/LabelType';
import { NoteType } from '../../types/NoteType';
import ColorPicker from '../Notes/components/ColorPicker/ColorPicker';
import LabelPicker from '../Notes/components/LabelPicker/LabelPicker';
import './LabeledNote.css';

const LabeledNote = ({ gridView }: GridProps) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState<LabelType | null>(null);
  const [labeledNotes, setLabeledNotes] = useState<NoteType[] | null>(null);

  // Hooks
  const { searchTerm } = useSearch();
  const { currentUser } = useAuth();
  const { notes, loading, fetchLabelDataById } = useFirebase(currentUser);
  const { setSelectedNote } = useSelectedNote();
  const { isColorPickerOpen, closeColorPicker } = useColorPicker();
  const { isLabelPickerOpen, closeLabelPicker } = useLabelPicker();
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
      const sortedNotes = notes
        ? [...notes]
            .sort(
              (a, b) =>
                b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
            )
            .filter(
              (note) =>
                note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (note.title &&
                  note.title.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        : [];
      const labeledNotes = sortedNotes.filter(
        (note) =>
          note.labels.includes(label.labelId) && !note.deleted && !note.archived
      );
      setLabeledNotes(labeledNotes);
    }
  }, [label, notes, searchTerm]);

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
      <ColorPicker
        isModalOpen={isColorPickerOpen}
        closeModalHandler={closeColorPicker}
      />
      <LabelPicker
        isModalOpen={isLabelPickerOpen}
        closeModalHandler={closeLabelPicker}
      />
    </>
  );
};

export default LabeledNote;
