import { IconNote, IconPin } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import NotesList from '../../components/Notes/NoteList/NoteList';
import SelectedNote from '../../components/Notes/SelectedNote/SelectedNote';
import { useAuth } from '../../hooks/useAuth';
import { useColorPicker } from '../../hooks/useColorPicker';
import useFirebase from '../../hooks/useFirebase';
import { useLabelPicker } from '../../hooks/useLabelPicker';
import { useSearch } from '../../hooks/useSearch';
import useSelectedNote from '../../hooks/useSelectedNote';
import { GridProps } from '../../types/GridProps';
import { NoteType } from '../../types/NoteType';
import './Notes.css';
import ColorPicker from './components/ColorPicker/ColorPicker';
import LabelPicker from './components/LabelPicker/LabelPicker';

const Notes = ({ gridView }: GridProps) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Hooks
  const { searchTerm } = useSearch();
  const { currentUser } = useAuth();
  const { notes, loading } = useFirebase(currentUser);
  const { setSelectedNote } = useSelectedNote();
  const { isColorPickerOpen, closeColorPicker } = useColorPicker();
  const { isLabelPickerOpen, closeLabelPicker } = useLabelPicker();

  useEffect(() => {
    console.log(isColorPickerOpen);
  }, [isLabelPickerOpen]);

  // Filter notes array

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

  const pinnedNotes = sortedNotes.filter(
    (note) => note.pinned && !note.archived && !note.deleted
  );
  const otherNotes = sortedNotes.filter(
    (note) => !note.pinned && !note.archived && !note.deleted
  );

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
      <div className='pinned-notes'>
        <div
          className={`notes-section ${gridView ? 'grid-view' : 'list-view'}`}
        >
          <div className='notes-section-title'>
            <IconPin size={28.8} style={{ marginRight: '0.5rem' }} />
            Pinned Notes
          </div>
        </div>
        {pinnedNotes.length > 0 ? (
          <NotesList
            notes={pinnedNotes}
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
      <div className='other-notes'>
        <span
          className={`notes-section ${gridView ? 'grid-view' : 'list-view'}`}
        >
          <div className='notes-section-title'>
            <IconNote size={28.8} style={{ marginRight: '0.5rem' }} />
            Other notes
          </div>
        </span>
        {otherNotes.length > 0 ? (
          <NotesList
            notes={otherNotes}
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

export default Notes;
