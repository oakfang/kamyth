import { db } from "./app";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const col = collection(db, "users");

async function digestHash(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function getUserId(username, hash) {
  const q = query(
    col,
    where("hash", "==", hash),
    where("username", "==", username)
  );
  const {docs} = await getDocs(q);
  return docs?.[0]?.id;
}

export async function getUser({ username, password, shouldCreate }) {
  const hash = await digestHash(password);
  const userId = await getUserId(username, hash);
  if (userId) {
    return { userId, username };
  }

  if (!shouldCreate) {
    throw new Error("User not found");
  }

  const { id } = await addDoc(col, {
    hash,
    username,
    createdAt: Timestamp.now(),
  });

  return {
    userId: id,
    username,
  };
}
