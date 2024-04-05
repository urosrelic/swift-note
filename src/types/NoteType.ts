import firebase from 'firebase/compat/app';
import { LabelType } from './LabelType';

export interface NoteType {
  noteId: string;
  title: string;
  content: string;
  userId: string;
  archived: boolean;
  pinned: boolean;
  deleted: boolean;
  createdAt: firebase.firestore.Timestamp;
  deletedAt: firebase.firestore.Timestamp | null;
  color: string;
  labels: LabelType[];
}
