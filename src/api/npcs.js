import { db } from "./app";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export async function deleteNPC(characterId) {
  await deleteDoc(doc(db, "npc", characterId));
}

export async function getUserNPCs(userId) {
  const q = query(collection(db, "npc"), where("userId", "==", userId));
  const { docs } = await getDocs(q);
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function setNPC({ id: _id, ...character }) {
  await setDoc(doc(db, "npc", _id), character, { merge: true });

  return character;
}

export async function getNPC(characterId) {
  const docRef = doc(db, "npc", characterId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: characterId,
      ...docSnap.data(),
    };
  } else {
    return null;
  }
}
