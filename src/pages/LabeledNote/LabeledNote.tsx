import LabelIcon from '@mui/icons-material/Label';
import { useState } from 'react';
import NotesList from '../../components/Notes/NoteList/NoteList';
import SelectedNote from '../../components/Notes/SelectedNote/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { useSelectedLabel } from '../../hooks/useSelectedLabel';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { NoteType } from '../../types/NoteType';
import './LabeledNote.css';

const LabeledNote = ({ gridView }: GridProps) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const { selectedLabel } = useSelectedLabel();

  // Filter notes array
  const sortedNotes = notes
    ? [...notes].sort(
        (a, b) =>
          b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      )
    : [];

  // Filter notes based on the selected label
  const filteredNotes = selectedLabel
    ? sortedNotes.filter((note) => note.labels.includes(selectedLabel.labelId))
    : sortedNotes;

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
            {selectedLabel?.labelName}
          </div>
        </div>
        {filteredNotes.length > 0 ? (
          <NotesList
            notes={filteredNotes}
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
        selectedNote={selectedNote}
        isModalOpen={isModalOpen}
        closeModalHandler={handleCloseModal}
      />
    </>
  );
};

export default LabeledNote;
