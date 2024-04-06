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
import { LabelType } from '../types/LabelType';
import { NoteType } from '../types/NoteType';

const useFirebase = (currentUser: FirebaseCurrentUser | null) => {
  // * States
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [notes, setNotes] = useState<NoteType[] | null>(null);
  const [labels, setLabels] = useState<LabelType[] | null>(null); // State to hold fetched labels

  // * Hooks
  const notesRef = useMemo(() => collection(db, 'notes'), []);
  const labelsRef = useMemo(() => collection(db, 'labels'), []);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const notesQuery = query(
        notesRef,
        where('userId', '==', currentUser.uid)
      );
      const labelsQuery = query(
        labelsRef,
        where('userId', '==', currentUser.uid)
      ); // Query to fetch all labels

      const notesUnsub = onSnapshot(
        notesQuery,
        (querySnapshot) => {
          const items: NoteType[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as NoteType;
            // @ts-ignore
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

      const labelsUnsub = onSnapshot(
        labelsQuery,
        (querySnapshot) => {
          const labels: LabelType[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as LabelType;
            // @ts-ignore
            labels.push({ labelId: doc.id, ...data });
          });
          setLabels(labels);
          setLoading(false);
        },
        (error) => {
          setError((error as Error).message || 'An error occurred');
          setLoading(false);
        }
      );

      return () => {
        notesUnsub();
        labelsUnsub();
      };
    } else {
      setNotes([]);
    }
  }, [currentUser]);

  // * Handlers
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

  const colorNote = async (noteId: string, color: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(notesRef, noteId), {
        color: color,
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
    labels,
    loading,
    error,
    addNote,
    deleteNote,
    togglePinNote,
    toggleArchiveNote,
    toggleDeletedNote,
    removeFromTrash,
    colorNote,
  };
};

export default useFirebase;
