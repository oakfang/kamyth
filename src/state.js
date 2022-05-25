import { createContext, useCallback, useContext, useMemo } from "react";
import { useImmer } from "use-immer";
import { set } from "lodash";

const StateContext = createContext();

export function useAppState() {
  const ctx = useContext(StateContext);

  return ctx;
}

const STATE_KEY = "app-state";

const INITIAL_STATE = {
  characters: {},
};

function useAppService() {
  const loadedAppState = useMemo(() => {
    const raw = localStorage.getItem(STATE_KEY);

    return raw ? JSON.parse(raw) : null;
  }, []);
  const [state, setState] = useImmer(loadedAppState ?? INITIAL_STATE);
  const isDirty = !(state === loadedAppState || state === INITIAL_STATE);
  const save = useCallback(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [state]);
  const clearAll = useCallback(() => {
    localStorage.removeItem(STATE_KEY);
    setState(INITIAL_STATE);
  }, [setState]);
  const characters = useMemo(() => {
    return Object.values(state.characters);
  }, [state.characters]);
  const addCharacter = useCallback(
    (character) => {
      setState((state) => {
        state.characters[character.id] = character;
      });
    },
    [setState]
  );
  const removeCharacter = useCallback(
    (id) => {
      setState((state) => {
        delete state.characters[id];
      });
    },
    [setState]
  );
  const getCharacter = useCallback(
    (characterId) => {
      return state.characters[characterId];
    },
    [state.characters]
  );
  const updateCharacter = useCallback(
    (characterId, path, value) => {
      setState((state) => {
        set(state.characters[characterId], path, value);
      });
    },
    [state.characters]
  );

  const ctx = useMemo(
    () => ({
      isDirty,
      save,
      clearAll,
      characters,
      addCharacter,
      getCharacter,
      updateCharacter,
      removeCharacter,
    }),
    [
      isDirty,
      save,
      clearAll,
      characters,
      addCharacter,
      getCharacter,
      updateCharacter,
      removeCharacter,
    ]
  );

  return ctx;
}

export function StateProvider({ children }) {
  const ctx = useAppService();
  return <StateContext.Provider value={ctx}>{children}</StateContext.Provider>;
}
