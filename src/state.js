import { createContext, useCallback, useContext, useMemo } from "react";
import { useImmer } from "use-immer";
import { set } from "lodash";
import produce from "immer";
import { useQuery, useQueryClient } from "react-query";
import {
  setCharacter,
  getUser,
  getCharacter,
  getUserCharacters,
  deleteCharacter,
  claimAsMember,
} from "./api";

const StateContext = createContext();

export function useAppState() {
  const ctx = useContext(StateContext);

  return ctx;
}

const TOKEN_KEY = "app-token";

const INITIAL_STATE = {
  user: null,
};

function useAppService() {
  const queryClient = useQueryClient();

  const loadedAppUser = useMemo(() => {
    const value = localStorage.getItem(TOKEN_KEY);
    return value ? JSON.parse(value) : null;
  }, []);

  const [state, setState] = useImmer(() => ({
    ...INITIAL_STATE,
    user: loadedAppUser,
  }));

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    queryClient.clear();
    setState({ user: null });
  }, [location, queryClient]);

  const isLoggedIn = !!state.user;

  const signUp = useCallback(
    async (parmeters) => {
      const user = await getUser(parmeters);
      user.id = user.userId;
      setState((draft) => {
        draft.user = user;
      });
      localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
    },
    [setState]
  );

  const userId = state.user?.id;

  const { data: characters } = useQuery(
    [userId, "characters"],
    () => getUserCharacters(state.user.id),
    {
      enabled: !!userId,
    }
  );

  const { data: npcs } = useQuery(
    [userId, "npcs"],
    () => getUserCharacters(state.user.id, "npcs"),
    {
      enabled: state.user?.isGM ?? false,
    }
  );

  const addCharacter = useCallback(
    async (character, scope = "characters") => {
      const boundCharacter = { ...character, userId };
      queryClient.invalidateQueries([userId, scope]);
      queryClient.setQueryData([userId, scope, character.id], character);

      setCharacter(boundCharacter, scope);
      return boundCharacter;
    },
    [setState, userId]
  );

  const addMember = useCallback(
    async ({ memberId }) => {
      const character = await claimAsMember(userId, memberId);
      queryClient.invalidateQueries([userId, "pcs"], { exact: true });
      queryClient.setQueryData([userId, "pcs"], (data) => {
        if (!data) {
          return [character];
        }
        return produce(data, (draft) => {
          draft.push(character);
        });
      });
    },
    [queryClient, userId]
  );

  const removeCharacter = useCallback(
    (id, scope = "characters") => {
      const character = queryClient.getQueryData([userId, scope, id]);
      if (character.userId !== userId) {
        return;
      }
      queryClient.invalidateQueries([userId, scope]);
      return deleteCharacter(id, scope);
    },
    [userId]
  );

  const getCharacterFromApi = useCallback(
    (characterId, scope = "characters") => {
      const characters = queryClient.getQueryData([userId, scope]);
      if (characters) {
        const character = characters.find((c) => c.id === characterId);
        if (character) {
          return character;
        }
      }
      if (scope === "characters") {
        const pcs = queryClient.getQueryData([userId, "pcs"]);
        if (pcs) {
          const character = pcs.find((c) => c.id === characterId);
          if (character) {
            return character;
          }
        }
      }

      return getCharacter(characterId, scope);
    },
    [userId, queryClient]
  );

  const updateCharacter = useCallback(
    async (characterId, path, value, scope = "characters") => {
      const character =
        queryClient.getQueryData([userId, scope, characterId]) ??
        (await getCharacterFromApi(characterId, scope));
      if (character.userId !== userId && character.gmId !== userId) {
        return;
      }
      queryClient.invalidateQueries([userId, scope], { exact: true });
      const updatedCharacter = produce(character, (draft) => {
        if (Array.isArray(path)) {
          path.forEach(([path, value]) => {
            set(draft, path, value);
          });
        } else {
          set(draft, path, value);
        }
      });
      if (character.gmId === userId) {
        queryClient.setQueryData(
          [userId, "pcs"],
          (data) =>
            data &&
            data.map((c) => (c.id === characterId ? updatedCharacter : c))
        );
      }
      queryClient.setQueryData([userId, scope, characterId], updatedCharacter);
      await setCharacter(
        queryClient.getQueryData([userId, scope, characterId]),
        scope
      );
    },
    [userId, queryClient, getCharacterFromApi]
  );

  const ctx = useMemo(
    () => ({
      isLoggedIn,
      characters,
      addCharacter,
      getCharacter: getCharacterFromApi,
      updateCharacter,
      removeCharacter,
      signUp,
      username: state.user?.username ?? null,
      isGM: state.user?.isGM ?? false,
      userId,
      logout,
      addMember,
      npcs,
    }),
    [
      isLoggedIn,
      characters,
      addCharacter,
      getCharacterFromApi,
      updateCharacter,
      removeCharacter,
      signUp,
      state.user,
      userId,
      logout,
      addMember,
      npcs,
    ]
  );

  return ctx;
}

export function StateProvider({ children }) {
  const ctx = useAppService();
  return <StateContext.Provider value={ctx}>{children}</StateContext.Provider>;
}
