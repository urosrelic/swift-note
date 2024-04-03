import firebase from 'firebase/compat/app';

export interface Note {
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
