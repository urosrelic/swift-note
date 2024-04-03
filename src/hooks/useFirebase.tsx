import { User as FirebaseCurrentUser } from 'firebase/auth';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../config/firebase';
import { NoteType } from '../utils/types/NoteType';

const useFirebase = (currentUser: FirebaseCurrentUser | null) => {
  const notesRef = useMemo(() => collection(db, 'notes'), []);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [notes, setNotes] = useState<NoteType[] | null>(null);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const q = query(notesRef, where('userId', '==', currentUser.uid));
      const unsub = onSnapshot(
        q,
        (querySnapshot) => {
          const items: NoteType[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as NoteType;
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

  const addNote = async (newNote: Omit<NoteType, 'noteId'>) => {
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

  const removeFromTrash = async (notes: NoteType[]) => {
    setLoading(true);
    try {
      notes.map((note) => {
        if (note.deleted) {
          deleteNote(note.noteId);
        } else {
          // Skip this iteration if the note is not deleted
          return;
        }
      });
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const toggleDeletedNote = async (noteId: string, isDeleted: boolean) => {
    setLoading(true);
    try {
      await updateDoc(doc(notesRef, noteId), {
        deleted: isDeleted,
        deletedAt: Timestamp.now(),
      });
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const togglePinNote = async (noteId: string, isPinned: boolean) => {
    setLoading(true);
    try {
      await updateDoc(doc(notesRef, noteId), {
        pinned: isPinned,
      });
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const toggleArchiveNote = async (noteId: string, isArchived: boolean) => {
    setLoading(true);
    try {
      await updateDoc(doc(notesRef, noteId), {
        archived: isArchived,
      });
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    notes,
    loading,
    error,
    addNote,
    deleteNote,
    togglePinNote,
    toggleArchiveNote,
    toggleDeletedNote,
    removeFromTrash,
  };
};

export default useFirebase;
