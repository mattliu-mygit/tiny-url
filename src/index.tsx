import React from "react";
import ReactDOM from "react-dom";
import App from "./frontend/App";
import { ThemeProvider } from "./frontend/color-theme/ThemeContext";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider initialTheme={"dark"}>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":id" element={<App />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
