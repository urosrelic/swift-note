import { User as FirebaseCurrentUser } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../config/firebase';
import { Note } from '../utils/types/Note';

const useFetch = (currentUser: FirebaseCurrentUser | null) => {
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

  return { notes, setNotes };
};

export default useFetch;
