import * as charsApi from "./characters";

export async function deleteNPC(characterId) {
  await charsApi.deleteCharacter(characterId, "npcs");
}

export async function getUserNPCs(userId) {
  return charsApi.getUserCharacters(userId, "npcs");
}

export async function setNPC(character) {
  return charsApi.setCharacter(character, "npcs");
}

export async function getNPC(characterId) {
  return charsApi.getCharacter(characterId, "npcs");
}
