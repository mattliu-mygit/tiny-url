import axios from "axios";
import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { useTimeoutFn } from "react-use";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import Content from "./Content";
const api = window.location.href.includes("localhost")
  ? "http://localhost:3001/"
  : "https://tiny-url-backend.herokuapp.com/";

function App() {
  const [url, setUrl] = useState("");
  const [id, setID] = useState("");
  const [shortened, setShortened] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [showShortened, setShowShortened] = useState(false);
  const [reInput, setReInput] = useState(true);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tags = params.get("id");
    if (tags && tags.length > 0)
      axios
        .get(api + "id/" + tags)
        .then((res) => {
          if (res.data !== "none") window.location.href = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shortened.length > 0) {
      setTimeout(() => {
        setShowShortened(true);
        setReInput(false);
        toast.success("Shortened URL successfully!");
      }, 900);
    }
  }, [shortened]);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // perform fetch on url
    event.preventDefault();
    if (url.length > 0 && id.length > 0)
      axios
        .post(api, { url, id })
        .then((res) => {
          setShortened(window.location.origin + "/tiny-url/?id=" + res.data);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    else if (reInput) toast.error("Please enter a valid url and id!");
  };

  const resetStates = () => {
    setUrl("");
    setShowShortened(false);
    setTimeout(() => {
      setReInput(true);
      setShortened("");
    }, 900);
    resetIsShowing();
  };

  return (
    <div className=" bg-white flex w-[100%] h-screen transition-all dark:bg-gray-800 ">
      <Toggle />
      <div className="absolute h-[75%] rounded-lg  mt-[5%] mb-[12.5%] w-[50%] mx-[25%] h-screen bg-gray-300 dark:bg-gray-900">
        <div className="absolute w-full mt-[10%] flex">
          <div className="mx-auto block mb-2 text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-red-600 cursor-default flex flex-row">
            Shorten that URL!
          </div>
        </div>
        <form
          onSubmit={onFormSubmit}
          className="absolute top-[32.5%] flex flex-col w-full"
        >
          <Content
            setUrl={setUrl}
            shortened={shortened}
            showShortened={showShortened}
            isShowing={isShowing}
            setID={setID}
            setShortened={setShortened}
          />
          <Button showShortened={showShortened} resetStates={resetStates} />
        </form>
      </div>
      <ToastContainer
        toastClassName={" bg-white dark:bg-gray-900 dark:text-gray-200"}
      />
    </div>
  );
}

export default App;
