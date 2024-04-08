import firebase from 'firebase/compat/app';
import { useState } from 'react';

import {
  Archive,
  Delete,
  DeleteForever,
  Label,
  Palette,
  PushPin,
  Restore,
  Unarchive,
} from '@mui/icons-material';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useAuth } from '../../../hooks/useAuth';
import { useColorPicker } from '../../../hooks/useColorPicker';
import useFirebase from '../../../hooks/useFirebase';
import { useLabelPicker } from '../../../hooks/useLabelPicker';
import useSelectedNote from '../../../hooks/useSelectedNote';
import { NoteType } from '../../../types/NoteType';
import { CustomMenu } from '../../CustomMenu/CustomMenu';
import './Note.css';
import NoteAction from './components/NoteAction/NoteAction';
import NoteLabel from './components/NoteLabel/NoteLabel';

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
  labels?: string[];
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
  // * States
  const [noteHover, setNoteHover] = useState<boolean>(false);
  const isDesktop = useMediaQuery('screen and (min-width: 1024px)');

  // * Hooks
  const { currentUser } = useAuth();
  const { openColorPicker } = useColorPicker();
  const { openLabelPicker } = useLabelPicker();
  const { setSelectedNote } = useSelectedNote();
  const {
    deleteNote,
    togglePinNote,
    toggleArchiveNote,
    toggleDeletedNote,
    getLabelById,
  } = useFirebase(currentUser);

  // * Handlers
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

  const handleSelectNote = () => {
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
  };

  const handleColorAction = () => {
    openColorPicker();
    setSelectedNote({ noteId } as NoteType);
  };

  const handleLabelAction = () => {
    openLabelPicker();
    setSelectedNote({ noteId } as NoteType);
  };

  // * Conditional renders
  const renderMobileLayout = () => {
    return (
      <div
        className='note'
        onMouseEnter={() => setNoteHover(true)}
        onMouseLeave={() => setNoteHover(false)}
        style={{ backgroundColor: color }}
      >
        <div className='note-details' onClick={handleSelectNote}>
          {title && <span className='note-title'>{title}</span>}
        </div>
        <span className='note-content' onClick={handleSelectNote}>
          {content}
        </span>
        <div className='note-labels'>
          {labels?.map((labelId) => {
            const label = getLabelById(labelId);
            return label ? (
              <NoteLabel key={label.labelId} label={label} />
            ) : null;
          })}
        </div>
        {deleted ? (
          <>
            <div className='note-date' onClick={handleSelectNote}>
              Deleted at:{' '}
              <span className='note-date-value'>
                {deletedAt?.toDate().toLocaleString()}
              </span>
            </div>
            <div className='pin-note'>
              <CustomMenu
                options={[
                  {
                    optionIcon: <Restore />,
                    option: 'Restore',
                    menuItemAction: () => toggleDeleted(),
                  },
                  {
                    optionIcon: <DeleteForever />,
                    option: 'Delete forever',
                    menuItemAction: () => handleDeleteNote(),
                  },
                ]}
              />
            </div>
          </>
        ) : (
          <>
            <div className='pin-note'>
              <CustomMenu
                options={
                  archived
                    ? [
                        {
                          optionIcon: <Archive />,

                          option: archived ? 'Unarchive note' : 'Archive note',
                          menuItemAction: () => toggleArchived(),
                        },
                        {
                          optionIcon: <Delete />,

                          option: 'Delete note',
                          menuItemAction: () => toggleDeleted(),
                        },
                      ]
                    : [
                        {
                          optionIcon: <PushPin />,
                          option: pinned ? 'Unpin note' : 'Pin note',
                          menuItemAction: () => togglePinned(),
                        },
                        {
                          optionIcon: <Palette />,

                          option: 'Paint note',
                          menuItemAction: () => handleColorAction(),
                        },
                        {
                          optionIcon: <Label />,
                          option: 'Label note',
                          menuItemAction: () => handleLabelAction(),
                        },
                        {
                          optionIcon: <Archive />,

                          option: archived ? 'Unarchive note' : 'Archive note',
                          menuItemAction: () => toggleArchived(),
                        },
                        {
                          optionIcon: <Delete />,

                          option: 'Delete note',
                          menuItemAction: () => toggleDeleted(),
                        },
                      ]
                }
              />
            </div>

            <div className='note-date' onClick={handleSelectNote}>
              Created at:{' '}
              <span className='note-date-value'>
                {createdAt?.toDate().toLocaleString()}
              </span>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderDesktopLayout = () => {
    return (
      <div
        className='note'
        onMouseEnter={() => setNoteHover(true)}
        onMouseLeave={() => setNoteHover(false)}
        style={{ backgroundColor: color }}
      >
        <div className='note-details' onClick={handleSelectNote}>
          {title && <span className='note-title'>{title}</span>}
        </div>
        <span className='note-content' onClick={handleSelectNote}>
          {content}
        </span>
        <div className='note-labels'>
          {labels?.map((labelId) => {
            const label = getLabelById(labelId);
            return label ? (
              <NoteLabel key={label.labelId} label={label} />
            ) : null;
          })}
        </div>

        {deleted ? (
          <>
            <div className='note-date' onClick={handleSelectNote}>
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
              >
                <Restore />
              </NoteAction>
              <NoteAction
                hover={noteHover}
                title='Delete forever'
                onClick={handleDeleteNote}
              >
                <DeleteForever />
              </NoteAction>
            </div>
          </>
        ) : (
          <>
            <div className='note-date' onClick={handleSelectNote}>
              Created at:{' '}
              <span className='note-date-value'>
                {createdAt?.toDate().toLocaleString()}
              </span>
            </div>

            {archived ? (
              <div className='note-actions'>
                <NoteAction
                  hover={noteHover}
                  title={archived ? 'Unarchive note' : 'Archive note'}
                  onClick={toggleArchived}
                >
                  {archived ? <Unarchive /> : <Archive />}
                </NoteAction>

                <NoteAction
                  hover={noteHover}
                  title='Delete note'
                  onClick={toggleDeleted}
                >
                  <Delete />
                </NoteAction>
              </div>
            ) : (
              <>
                <div className='pin-note'>
                  <NoteAction
                    hover={noteHover}
                    title={pinned ? 'Unpin note' : 'Pin note'}
                    onClick={togglePinned}
                  >
                    <PushPin />
                  </NoteAction>
                </div>
                <div className='note-actions'>
                  <NoteAction
                    hover={noteHover}
                    title='Paint note'
                    onClick={handleColorAction}
                  >
                    <Palette />
                  </NoteAction>
                  <NoteAction
                    hover={noteHover}
                    title='Label note'
                    onClick={handleLabelAction}
                  >
                    <Label />
                  </NoteAction>
                  <NoteAction
                    hover={noteHover}
                    title={archived ? 'Unarchive note' : 'Archive note'}
                    onClick={toggleArchived}
                  >
                    {archived ? <Unarchive /> : <Archive />}
                  </NoteAction>

                  <NoteAction
                    hover={noteHover}
                    title='Delete note'
                    onClick={toggleDeleted}
                  >
                    <Delete />
                  </NoteAction>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return isDesktop ? renderDesktopLayout() : renderMobileLayout();
};

export default Note;
