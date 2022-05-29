import { db } from "./app";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { isEmpty } from "lodash";

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
  const {
    docs: [doc],
  } = await getDocs(q);
  if (!doc) return null;

  return {
    userId: doc.id,
    ...doc.data(),
  };
}

export async function getUser({ username, password, isGM, shouldCreate }) {
  const hash = await digestHash(password);
  const user = await getUserId(username, hash);

  if (user) {
    return user;
  }

  if (!shouldCreate) {
    throw new Error("User not found");
  }

  const { id } = await addDoc(col, {
    hash,
    username,
    isGM,
    createdAt: Timestamp.now(),
  });

  return {
    userId: id,
    username,
    isGM,
  };
}

export async function getUsernameById(userIds) {
  if (isEmpty(userIds)) {
    return {};
  }
  const q = query(col, where(documentId(), "in", userIds));
  const { docs } = await getDocs(q);
  return docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().username;
    return acc;
  }, {});
}
