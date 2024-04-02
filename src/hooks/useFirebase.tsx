import { User as FirebaseCurrentUser } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../config/firebase';
import { Note } from '../utils/types/Note';

const useFirebase = (currentUser: FirebaseCurrentUser | null) => {
  const notesRef = useMemo(() => collection(db, 'notes'), []);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const q = query(notesRef, where('userId', '==', currentUser.uid));
      const unsub = onSnapshot(
        q,
        (querySnapshot) => {
          const items: Note[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Note;
            items.push({ noteId: doc.id, ...data });
          });
          setNotes(items);
          setLoading(false);
        },
        (error) => {
          setError((error as Error).message || 'An error occurred');
          setLoading(false);
        }
      );
      return () => {
        unsub();
      };
    } else {
      setNotes([]);
    }
  }, [currentUser]);

  const addNote = async (newNote: Omit<Note, 'noteId'>) => {
    setLoading(true);
    try {
      await addDoc(notesRef, newNote);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(notesRef, noteId));
      console.log('Note deleted successfully');
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  return { notes, loading, error, addNote, deleteNote };
};

export default useFirebase;
