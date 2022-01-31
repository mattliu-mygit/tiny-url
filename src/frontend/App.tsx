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
  const [shortened, setShortened] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [showShortened, setShowShortened] = useState(false);
  const [reInput, setReInput] = useState(true);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

  useEffect(() => {
    const paramArr = window.location.href.split("/");
    const param = paramArr[paramArr.length - 1];
    if (param.length > 0)
      axios
        .get("api" + param)
        .then((res) => {
          if (res.data !== "none") window.location.href = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // perform fetch on url
    event.preventDefault();
    if (url.length > 0)
      axios
        .post(api, { url })
        .then((res) => {
          setShortened(res.data);
          setTimeout(() => {
            setShowShortened(true);
            setReInput(false);
            toast.success("Shortened URL successfully!");
          }, 900);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    else if (reInput) toast.error("Please enter something in the box!");
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
        <div className="absolute w-full mt-20 flex">
          <div className="mx-auto block mb-2 text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-red-600 cursor-default flex flex-row">
            Shorten that URL!
          </div>
        </div>
        <form
          onSubmit={onFormSubmit}
          className="absolute mt-44 flex flex-col w-full"
        >
          <Content
            url={url}
            setUrl={setUrl}
            shortened={shortened}
            showShortened={showShortened}
            isShowing={isShowing}
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
