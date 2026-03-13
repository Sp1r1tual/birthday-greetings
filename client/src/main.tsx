import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App.tsx";
import { AudioProvider } from "./contexts/AudioProvider.tsx";

import { store } from "./store/store.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </Provider>
  </StrictMode>,
);
