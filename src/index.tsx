import React from "react";
import ReactDOM from "react-dom";
import App from "./frontend/App";
import reportWebVitals from "./frontend/reportWebVitals";
import { ThemeProvider } from "./frontend/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider initialTheme={"dark"}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":id" element={<App />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
