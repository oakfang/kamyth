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

  const isLoggedIn = !!state.user;
  const signUp = useCallback(
    async (parmeters) => {
      const { userId, username } = await getUser(parmeters);
      const user = { id: userId, username };
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

  const addCharacter = useCallback(
    async (character) => {
      const boundCharacter = { ...character, userId };
      queryClient.invalidateQueries([userId, "characters"]);
      queryClient.setQueryData([userId, "characters", character.id], character);

      setCharacter(boundCharacter);
      return boundCharacter;
    },
    [setState, userId]
  );

  const removeCharacter = useCallback(
    (id) => {
      queryClient.invalidateQueries([userId, "characters"]);
      return deleteCharacter(id);
    },
    [userId]
  );

  const getCharacterFromApi = useCallback(
    (characterId) => {
      const characters = queryClient.getQueryData([userId, "characters"]);
      if (characters) {
        const character = characters.find((c) => c.id === characterId);
        if (character) {
          return character;
        }
      }

      return getCharacter(characterId);
    },
    [userId, queryClient]
  );

  const updateCharacter = useCallback(
    async (characterId, path, value) => {
      queryClient.invalidateQueries([userId, "characters"]);
      queryClient.setQueryData([userId, "characters", characterId], (data) =>
        produce(data, (draft) => set(draft, path, value))
      );
      await setCharacter(
        queryClient.getQueryData([userId, "characters", characterId])
      );
    },
    [userId]
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
      userId,
    }),
    [
      isLoggedIn,
      characters,
      addCharacter,
      getCharacterFromApi,
      updateCharacter,
      removeCharacter,
      signUp,
      state.user?.username,
      userId,
    ]
  );

  return ctx;
}

export function StateProvider({ children }) {
  const ctx = useAppService();
  return <StateContext.Provider value={ctx}>{children}</StateContext.Provider>;
}
