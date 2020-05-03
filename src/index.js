import React from "react";
import ReactDOM from "react-dom";
import App from "./components/main/App";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
