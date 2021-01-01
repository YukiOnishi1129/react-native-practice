import firebase from "firebase";

export type User = {
  id?: string;
  name: string;
  pushToken?: string;
  updatedAt: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
} | null;

export type UserInitail = {
  id?: string;
  name: string;
  pushToken?: string;
  updatedAt: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
};

export const initialUser: UserInitail = {
  name: "",
  updatedAt: firebase.firestore.Timestamp.now(),
  createdAt: firebase.firestore.Timestamp.now(),
};
