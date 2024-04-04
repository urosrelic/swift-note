import firebase from 'firebase/compat/app';
import { useState } from 'react';

import {
  Archive,
  Delete,
  DeleteForever,
  Palette,
  PushPin,
  Restore,
  Unarchive,
} from '@mui/icons-material';
import { useAuth } from '../../../hooks/useAuth';
import { useColorPicker } from '../../../hooks/useColorPicker';
import useFirebase from '../../../hooks/useFirebase';
import useSelectedNote from '../../../hooks/useSelectedNote';
import { NoteType } from '../../../types/NoteType';
import NoteAction from '../NoteAction/NoteAction';
import './Note.css';

interface NoteProps {
  noteId: string;
  title: string;
  content: string;
  archived: boolean;
  pinned: boolean;
  deleted: boolean;
  createdAt: firebase.firestore.Timestamp;
  deletedAt: firebase.firestore.Timestamp | null;
  color: string;
  labels: string[];
  handleNoteClick: (note: NoteType) => void;
}

const Note = ({
  noteId,
  title,
  content,
  archived,
  pinned,
  deleted,
  createdAt,
  deletedAt,
  color,
  labels,
  handleNoteClick,
}: NoteProps) => {
  // States
  const [noteHover, setNoteHover] = useState<boolean>(false);
  const [tooltipClicked, setTooltipClicked] = useState<boolean>(false);

  // Hooks
  const { currentUser } = useAuth();
  const { openColorPicker } = useColorPicker();
  const { setSelectedNote } = useSelectedNote();
  const { deleteNote, togglePinNote, toggleArchiveNote, toggleDeletedNote } =
    useFirebase(currentUser);

  // Handlers
  const handleDeleteNote = () => {
    if (noteId) {
      deleteNote(noteId);
    } else {
      console.error('Invalid noteId:', noteId);
    }
  };

  const toggleDeleted = async () => {
    await toggleDeletedNote(noteId, !deleted);
  };

  const togglePinned = async () => {
    await togglePinNote(noteId, !pinned);
  };

  const toggleArchived = async () => {
    await toggleArchiveNote(noteId, !archived);
  };

  const handleTooltipClick = () => {
    setTooltipClicked(true);
  };

  const handleNoteClickWrapper = () => {
    if (!tooltipClicked) {
      handleNoteClick({
        noteId,
        title,
        content,
        archived,
        pinned,
        deleted,
        createdAt,
        deletedAt,
        color,
        labels,
      } as NoteType);
    }
    setTooltipClicked(false);
  };

  const handleColorAction = () => {
    openColorPicker();
    setSelectedNote({ noteId } as NoteType);
  };

  return (
    <div
      className='note'
      onMouseEnter={() => setNoteHover(true)}
      onMouseLeave={() => setNoteHover(false)}
      style={{ backgroundColor: color }}
      onClick={handleNoteClickWrapper}
    >
      <div className='note-details'>
        {title && <span className='note-title'>{title}</span>}
      </div>
      <span className='note-content'>{content}</span>
      {deleted ? (
        <>
          <div className='note-date'>
            Deleted at:{' '}
            <span className='note-date-value'>
              {deletedAt?.toDate().toLocaleString()}
            </span>
          </div>
          <div className='note-actions'>
            <NoteAction
              hover={noteHover}
              title='Restore'
              onClick={toggleDeleted}
              onClickCapture={handleTooltipClick}
            >
              <Restore />
            </NoteAction>
            <NoteAction
              hover={noteHover}
              title='Delete forever'
              onClick={handleDeleteNote}
              onClickCapture={handleTooltipClick}
            >
              <DeleteForever />
            </NoteAction>
          </div>
        </>
      ) : (
        <>
          <div className='pin-note'>
            <NoteAction
              hover={noteHover}
              title={pinned ? 'Unpin note' : 'Pin note'}
              onClick={togglePinned}
              onClickCapture={handleTooltipClick}
            >
              <PushPin />
            </NoteAction>
          </div>

          <div className='note-date'>
            Created at:{' '}
            <span className='note-date-value'>
              {createdAt?.toDate().toLocaleString()}
            </span>
          </div>
          <div className='note-actions'>
            <NoteAction
              hover={noteHover}
              title='Paint note'
              onClick={handleColorAction}
              onClickCapture={handleTooltipClick}
            >
              <Palette />
            </NoteAction>
            <NoteAction
              hover={noteHover}
              title={archived ? 'Unarchive note' : 'Archive note'}
              onClick={toggleArchived}
              onClickCapture={handleTooltipClick}
            >
              {archived ? <Unarchive /> : <Archive />}
            </NoteAction>
            <NoteAction
              hover={noteHover}
              title='Delete note'
              onClick={toggleDeleted}
              onClickCapture={handleTooltipClick}
            >
              <Delete />
            </NoteAction>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
