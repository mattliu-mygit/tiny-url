import axios from "axios";
import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState("");
  const handleURLChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // perform fetch on url
    event.preventDefault();
    if (url.length > 0)
      axios
        .post("http://localhost:3001", { url })
        .then((res) => {
          setShortened(res.data);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ margin: "auto" }}>
        {shortened.length > 0 ? (
          <>Here's your shortened url: {shortened}</>
        ) : (
          <form onSubmit={onFormSubmit}>
            <input
              placeholder="your url"
              value={url}
              onChange={handleURLChange}
            ></input>
            <button type="submit">Generate</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
