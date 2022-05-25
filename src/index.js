import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider, CssBaseline, createTheme } from "@nextui-org/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./scrollbar.css";
import { StateProvider } from "./state";
import App from "./App";
import { CharacterList } from "./CharactersList";
import { CreateCharacter } from "./CreateCharacter";
import { CharacterSheet } from "./CharacterSheet";

const darkTheme = createTheme({
  type: "dark",
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <NextUIProvider theme={darkTheme}>
      <CssBaseline />
      <StateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                path=""
                element={<Navigate to="/characters" replace={true} />}
              />
              <Route path="characters" element={<Outlet />}>
                <Route path="" element={<CharacterList />} />
                <Route path="new" element={<CreateCharacter />} />
                <Route path=":characterId" element={<CharacterSheet />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </StateProvider>
    </NextUIProvider>
  </StrictMode>
);
