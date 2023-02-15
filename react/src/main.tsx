import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./assets/fonts/SourceSansPro-Bold.ttf";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./libs/redux/store";
import ChatProvider from "./components/meta/Context/ChatProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChatProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChatProvider>
);
