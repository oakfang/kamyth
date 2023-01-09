import { supabase } from "./app";

export async function deleteCharacter(
  characterId,
  useCollection = "characters"
) {
  await supabase.from(useCollection).delete().delete().eq("id", characterId);
}

const detailsMapper = ({ details, ...character }) => ({
  ...character,
  ...details,
});

export async function getUserCharacters(userId, useCollection = "characters") {
  const { data, error } = await supabase
    .from(useCollection)
    .select()
    .eq("userId", userId);
  if (error) throw error;
  return data.map(detailsMapper);
}

export async function getPartyMembers(userId, useCollection = "characters") {
  const { data, error } = await supabase
    .from(useCollection)
    .select()
    .eq("gmId", userId);
  if (error) throw error;
  return data.map(detailsMapper);
}

export async function setCharacter(
  { id, userId, gmId, ...details },
  useCollection = "characters"
) {
  const { data, error } = await supabase
    .from(useCollection)
    .upsert({ id, userId, gmId, details })
    .select();
  if (error) throw error;
  return data;
}

export async function claimAsMember(
  userId,
  characterId,
  useCollection = "characters"
) {
  const character = await getCharacter(characterId, useCollection);
  if (!character) {
    throw new Error("Character not found");
  }
  if (character.gmId && character.gmId !== userId) {
    throw new Error("Character is already claimed");
  }
  await supabase
    .from(useCollection)
    .update({ gmId: userId })
    .eq("id", characterId);
  return { ...character, gmId: userId };
}

export async function getCharacter(characterId, useCollection = "characters") {
  const { data, error } = await supabase
    .from(useCollection)
    .select()
    .eq("id", characterId)
    .limit(1)
    .single();
  if (error) return null;
  return detailsMapper(data);
}
