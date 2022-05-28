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

export async function deleteCharacter(
  characterId,
  useCollection = "characters"
) {
  await deleteDoc(doc(db, useCollection, characterId));
}

export async function getUserCharacters(userId, useCollection = "characters") {
  const q = query(collection(db, useCollection), where("userId", "==", userId));
  const { docs } = await getDocs(q);
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPartyMembers(userId, useCollection = "characters") {
  const q = query(collection(db, useCollection), where("gmId", "==", userId));
  const { docs } = await getDocs(q);
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function setCharacter(
  { id: _id, ...character },
  useCollection = "characters"
) {
  await setDoc(doc(db, useCollection, _id), character, { merge: true });

  return character;
}

export async function claimAsMember(
  userId,
  characterId,
  useCollection = "characters"
) {
  const character = await getCharacter(characterId);
  if (!character) {
    throw new Error("Character not found");
  }
  if (character.gmId && character.gmId !== userId) {
    throw new Error("Character is already claimed");
  }
  await setDoc(
    doc(db, useCollection, characterId),
    { gmId: userId },
    { merge: true }
  );
  return { ...character, gmId: userId };
}

export async function getCharacter(characterId, useCollection = "characters") {
  const docRef = doc(db, useCollection, characterId);
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
