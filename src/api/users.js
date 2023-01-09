import { supabase } from "./app";
import { isEmpty } from "lodash";

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
  const { data: doc, error } = await supabase.from('users')
    .select()
    .eq("hash", hash)
    .eq("username", username)
    .limit(1)
    .single();

  if (!doc || error) return null;

  return {
    userId: doc.id,
    ...doc,
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

  const id = crypto.randomUUID();

  await supabase.from('users').insert({ id, hash, username, isGM })

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
  const { data: docs, error } = supabase.from('users').select().in("id", userIds);

  if (error) throw error;
  return docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().username;
    return acc;
  }, {});
}
