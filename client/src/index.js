import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ImageProvider } from "./components/context/ImgContext";

ReactDOM.render(
  <React.StrictMode>
    <ImageProvider>
      <App />
    </ImageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
