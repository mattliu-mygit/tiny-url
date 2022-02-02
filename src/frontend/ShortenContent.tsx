import { Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { toast } from "react-toastify";
const api = window.location.href.includes("localhost")
  ? "http://localhost:3001/"
  : "https://tiny-url-backend.herokuapp.com/";

/**
 * Shorten URL form content
 * @param shortened - the shortened url
 * @param isShowing - whether the form is showing
 * @param setID - setter for id
 * @param setUrl - setter for url
 * @param setShortened - setter for shortened url
 */
const ShortenContent: FC<{
  shortened: string;
  isShowing: boolean;
  setID: Function;
  setUrl: Function;
  setShortened: Function;
}> = ({ shortened, isShowing, setUrl, setID, setShortened }) => {
  const [sameID, setSameID] = useState<boolean>(false);

  /**
   * Handles change to the url input
   * @param event the default input onChange event.
   */
  const handleURLChange = (event: any) => {
    if (event.target.value.length > 0) {
      axios
        .get(api + "url/?url=" + event.target.value)
        .then((res) => {
          if (res.data === "none") {
            setUrl(event.target.value);
          } else {
            setUrl("");
            setShortened(window.location.origin + "/tiny-url/?id=" + res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setUrl("");
    }
  };

  /**
   * Handles changes to the ID input
   * @param event the default input onChange event.
   */
  const handleIDChange = (event: any) => {
    if (event.target.value.length > 0)
      axios.get(api + "id/" + event.target.value).then((res) => {
        if (res.data !== "none") {
          setSameID(true);
          toast.error("ID already exists!");
        } else {
          setSameID(false);
          setID(event.target.value);
        }
      });
    else {
      setID("");
      setSameID(false);
    }
  };

  return (
    <>
      <Transition
        as={Fragment}
        show={shortened.length === 0}
        enter="transform transition duration-[120ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-[890ms] transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-100 "
      >
        <div className="relative mx-auto">
          <div>
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none -top-[4.7rem]">
              <Transition
                as={Fragment}
                show={isShowing}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-0 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 rotate-90 "
              >
                <svg
                  className="w-6 h-6 dark:text-white text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </Transition>
            </div>

            <DebounceInput
              className="bg-gray-50 my-8 border border-gray-300 dark:autofill:bg-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              minLength={1}
              debounceTimeout={500}
              placeholder="Enter your url here!"
              onChange={handleURLChange}
            />
          </div>
          <div className="relative mt-1 mx-auto">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              {!sameID ? (
                <Transition
                  as={Fragment}
                  show={isShowing}
                  enter="transform transition duration-[400ms]"
                  enterFrom="opacity-0 rotate-[-120deg] scale-50"
                  enterTo="opacity-100 rotate-0 scale-100"
                  leave="transform duration-200 transition ease-in-out"
                  leaveFrom="opacity-100 rotate-0 scale-100 "
                  leaveTo="opacity-0 scale-95 rotate-90 "
                >
                  <svg
                    className="w-6 h-6 dark:text-white text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </Transition>
              ) : (
                <Transition
                  as={Fragment}
                  show={isShowing}
                  enter="transform transition duration-[400ms]"
                  enterFrom="opacity-0 rotate-[-120deg] scale-50"
                  enterTo="opacity-100 rotate-0 scale-100"
                  leave="transform duration-200 transition ease-in-out"
                  leaveFrom="opacity-100 rotate-0 scale-100 "
                  leaveTo="opacity-0 scale-95 rotate-0 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Transition>
              )}
            </div>
            <DebounceInput
              className="bg-gray-50 my-8 border border-gray-300 dark:autofill:bg-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Your shortened id here!"
              minLength={1}
              debounceTimeout={500}
              onChange={handleIDChange}
            />
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ShortenContent;
