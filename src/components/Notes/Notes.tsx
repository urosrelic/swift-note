import { useMediaQuery } from '@uidotdev/usehooks';
import firebase from 'firebase/compat/app';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { GridProps } from '../../utils/types/GridProps';
import Note from './Note';
import './Notes.css';

interface Note {
  noteId: string;
  archived: boolean;
  color: string;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  labels: string[];
  pinned: boolean;
  title: string;
  userId: string;
}

const Notes = ({ gridView }: GridProps) => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  const notesClassName = gridView ? 'grid-view' : 'list-view';

  const largerScreen = useMediaQuery('only screen and (min-width: 452px)');

  const notesRef = useMemo(() => collection(db, 'notes'), []);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const q = query(notesRef, where('userId', '==', currentUser.uid));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const items: Note[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Note;
          items.push({ noteId: doc.id, ...data });
        });
        setNotes(items);
        console.log(items);
      });
      return () => {
        unsub();
      };
    }
  }, [currentUser]);

  const smallScreenLayout = () => {
    return (
      <div className='notes grid-view'>
        {notes &&
          notes.map((note) => (
            <Note
              key={note.noteId}
              title={note.title}
              createdAt={note.createdAt}
              content={note.content}
            />
          ))}
      </div>
    );
  };

  const largerScreenLayout = () => {
    return (
      <div className={`notes ${notesClassName}`}>
        {notes &&
          notes.map((note) => (
            <Note
              key={note.noteId}
              title={note.title}
              createdAt={note.createdAt}
              content={note.content}
            />
          ))}
      </div>
    );
  };

  return largerScreen ? largerScreenLayout() : smallScreenLayout();
};

export default Notes;
