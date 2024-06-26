import { User as FirebaseCurrentUser } from 'firebase/auth';
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
  const [labels, setLabels] = useState<LabelType[] | null>(null);

  // * Hooks
  const notesRef = useMemo(() => collection(db, 'notes'), [currentUser]);
  const labelsRef = useMemo(() => collection(db, 'labels'), [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (!notes || !labels) {
        fetchNotesAndLabels(currentUser);
      }
    }
  }, [currentUser]);

  // * Fetching
  const fetchNotesAndLabels = (currentUser: FirebaseCurrentUser) => {
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
  };

  const fetchLabelDataById = async (
    labelId: string
  ): Promise<LabelType | null> => {
    setLoading(true);
    try {
      const docRef = doc(labelsRef, labelId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const labelData: LabelType = {
          labelId: docSnap.id,
          labelName: data.labelName,
          userId: data.userId,
        };

        setLoading(false);
        return labelData;
      } else {
        setLoading(false);
        return null;
      }
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
      return null;
    }
  };

  // * Filtration
  const filterLabelsById = (labelId: string): LabelType | null => {
    if (!labels) {
      return null;
    }

    const label = labels.find((label) => label.labelId === labelId);

    return label || null;
  };

  // * Handlers

  // Note crud

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

  const updateNote = async (noteId: string, title: string, content: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(notesRef, noteId), {
        title: title,
        content: content,
      });
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  // Label crud

  const createLabel = async (newLabel: Omit<LabelType, 'labelId'>) => {
    setLoading(true);
    try {
      await addDoc(labelsRef, newLabel);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const updateNoteLabel = async (noteId: string, labelId: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(notesRef, noteId), {
        labels: arrayUnion(labelId),
      });
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const removeLabelFromNote = async (noteId: string, labelId: string) => {
    setLoading(true);
    try {
      const noteRef = doc(notesRef, noteId);
      await updateDoc(noteRef, {
        labels: arrayRemove(labelId),
      });
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const deleteLabel = async (labelId: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(labelsRef, labelId));
      console.log('Label deleted successfully');
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    }
  };

  const updateLabelName = async (labelId: string, labelName: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(labelsRef, labelId), {
        labelName: labelName,
      });
      console.log('Label deleted successfully');
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
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
    createLabel,
    updateNoteLabel,
    updateLabelName,
    updateNote,
    removeLabelFromNote,
    deleteLabel,
    fetchLabelDataById,
    filterLabelsById,
  };
};

export default useFirebase;
