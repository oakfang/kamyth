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

export async function deleteCharacter(characterId) {
  await deleteDoc(doc(db, "characters", characterId));
}

export async function getUserCharacters(userId) {
  const q = query(collection(db, "characters"), where("userId", "==", userId));
  const { docs } = await getDocs(q);
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPartyMembers(userId) {
    const q = query(collection(db, "characters"), where("gmId", "==", userId));
    const { docs } = await getDocs(q);
    return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

export async function setCharacter({ id: _id, ...character }) {
  await setDoc(doc(db, "characters", _id), character, { merge: true });

  return character;
}

export async function claimAsMember(userId, characterId) {
  const character = await getCharacter(characterId);
  if (!character) {
    throw new Error("Character not found");
  }
  if (character.gmId && character.gmId !== userId) {
    throw new Error("Character is already claimed");
  }
  await setDoc(
    doc(db, "characters", characterId),
    { gmId: userId },
    { merge: true }
  );
  return { ...character, gmId: userId };
}

export async function getCharacter(characterId) {
  const docRef = doc(db, "characters", characterId);
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
