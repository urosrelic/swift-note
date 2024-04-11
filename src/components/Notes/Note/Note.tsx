import firebase from 'firebase/compat/app';
import { useState } from 'react';

import {
  IconArchive,
  IconArchiveOff,
  IconPalette,
  IconPin,
  IconRestore,
  IconTags,
  IconTrash,
  IconTrashX,
} from '@tabler/icons-react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useAuth } from '../../../hooks/useAuth';
import { useColorPicker } from '../../../hooks/useColorPicker';
import useFirebase from '../../../hooks/useFirebase';
import { useLabelPicker } from '../../../hooks/useLabelPicker';
import useSelectedNote from '../../../hooks/useSelectedNote';
import { NoteType } from '../../../types/NoteType';
import './Note.css';
import { CustomMenu } from './components/CustomMenu/CustomMenu';
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
    filterLabelsById,
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
            const label = filterLabelsById(labelId);
            return label ? (
              <NoteLabel key={label.labelId} label={label} noteId={noteId} />
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
                    optionIcon: <IconRestore />,
                    option: 'Restore',
                    menuItemAction: () => toggleDeleted(),
                  },
                  {
                    optionIcon: <IconTrashX />,
                    option: 'Destroy',
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
                          optionIcon: <IconArchive />,

                          option: archived ? 'Unarchive' : 'Archive',
                          menuItemAction: () => toggleArchived(),
                        },
                        {
                          optionIcon: <IconTrash />,

                          option: 'Delete',
                          menuItemAction: () => toggleDeleted(),
                        },
                      ]
                    : [
                        {
                          optionIcon: <IconPin />,
                          option: pinned ? 'Unpin' : 'Pin',
                          menuItemAction: () => togglePinned(),
                        },
                        {
                          optionIcon: <IconPalette />,

                          option: 'Paint',
                          menuItemAction: () => handleColorAction(),
                        },
                        {
                          optionIcon: <IconTags />,
                          option: 'Label',
                          menuItemAction: () => handleLabelAction(),
                        },
                        {
                          optionIcon: <IconArchive />,

                          option: archived ? 'Unarchive' : 'Archive',
                          menuItemAction: () => toggleArchived(),
                        },
                        {
                          optionIcon: <IconTrash />,
                          option: 'Delete',
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
            const label = filterLabelsById(labelId);
            return label ? (
              <NoteLabel key={label.labelId} label={label} noteId={noteId} />
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
                <IconRestore />
              </NoteAction>
              <NoteAction
                hover={noteHover}
                title='Destroy'
                onClick={handleDeleteNote}
              >
                <IconTrashX />
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
                  title={archived ? 'Unarchive' : 'Archive'}
                  onClick={toggleArchived}
                >
                  {archived ? <IconArchiveOff /> : <IconArchive />}
                </NoteAction>

                <NoteAction
                  hover={noteHover}
                  title='Delete'
                  onClick={toggleDeleted}
                >
                  <IconTrash />
                </NoteAction>
              </div>
            ) : (
              <>
                <div className='pin-note'>
                  <NoteAction
                    hover={noteHover}
                    title={pinned ? 'Unpin' : 'Pin'}
                    onClick={togglePinned}
                  >
                    <IconPin />
                  </NoteAction>
                </div>
                <div className='note-actions'>
                  <NoteAction
                    hover={noteHover}
                    title='Paint'
                    onClick={handleColorAction}
                  >
                    <IconPalette />
                  </NoteAction>
                  <NoteAction
                    hover={noteHover}
                    title='Label'
                    onClick={handleLabelAction}
                  >
                    <IconTags />
                  </NoteAction>
                  <NoteAction
                    hover={noteHover}
                    title={archived ? 'Unarchive' : 'Archive'}
                    onClick={toggleArchived}
                  >
                    {archived ? <IconArchiveOff /> : <IconArchive />}
                  </NoteAction>

                  <NoteAction
                    hover={noteHover}
                    title='Delete'
                    onClick={toggleDeleted}
                  >
                    <IconTrash />
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
