import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider, CssBaseline, createTheme } from "@nextui-org/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./scrollbar.css";
import { StateProvider } from "./state";
import App from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import { CharacterList } from "./CharactersList";
import { CreateCharacter } from "./CreateCharacter";
import { CharacterSheet } from "./CharacterSheet";
import { Auth, useAuthLock } from "./Auth";
import { AppIndex } from "./AppIndex";
import { PartyPage } from "./PartyPage";

const darkTheme = createTheme({
  type: "dark",
});

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function LockedOutlet() {
  useAuthLock();

  return <Outlet />;
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={darkTheme}>
        <CssBaseline />
        <StateProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="" element={<AppIndex />} />
                <Route path="auth" element={<Auth />} />
                <Route path="pcs" element={<PartyPage />} />
                <Route path="characters" element={<LockedOutlet />}>
                  <Route path="" element={<CharacterList />} />
                  <Route path="new" element={<CreateCharacter />} />
                  <Route
                    path=":characterId"
                    element={
                      <ErrorBoundary>
                        <CharacterSheet />
                      </ErrorBoundary>
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </Router>
        </StateProvider>
      </NextUIProvider>
      {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  </StrictMode>
);
