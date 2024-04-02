import { User as FirebaseCurrentUser } from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../config/firebase';
import { Note } from '../utils/types/Note';

const useFirebase = (currentUser: FirebaseCurrentUser | null) => {
  const notesRef = useMemo(() => collection(db, 'notes'), []);

  const [notes, setNotes] = useState<Note[] | null>(null);

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
    } else {
      setNotes([]);
    }
  }, [currentUser]);

  const addNote = async (newNote: Omit<Note, 'noteId'>) => {
    try {
      await addDoc(notesRef, newNote);
    } catch (error) {
      console.error('Error adding note: ', error);
    }
  };

  return { notes, setNotes, addNote };
};

export default useFirebase;
