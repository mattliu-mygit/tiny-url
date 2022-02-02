import { Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { toast } from "react-toastify";
import ShortenContent from "./ShortenContent";

/**
 * The main content of the app.
 * @param showShortened Whether the shortened content should be shown.
 * @param shortened The shortened url.
 * @param isShowing Whether the shortened url is showing.
 * @param setID The function to set the id of the shortened url.
 * @param setUrl A function to set the url state.
 * @param setShortened A function to set the shortened url state.
 */
const Content: FC<{
  showShortened: boolean;
  shortened: string;
  isShowing: boolean;
  setID: Function;
  setUrl: Function;
  setShortened: Function;
}> = ({ showShortened, shortened, isShowing, setUrl, setID, setShortened }) => {
  /**
   * Copies the shortened url to clipboard
   */
  const copyText = () => {
    toast.success("Copied to clipboard!");
    navigator.clipboard.writeText(shortened);
  };
  return (
    <>
      <Transition
        as={Fragment}
        show={showShortened}
        enter="transform transition duration-[120ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-[890ms] transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-100 "
      >
        <div className="mx-auto dark:text-gray-400 text-white">
          <div
            className="relative mt-1 mx-auto cursor-pointer"
            onClick={copyText}
          >
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
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
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </Transition>
            </div>
            <div
              className="bg-gray-50 w-80 my-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your url here!"
            >
              {shortened}
            </div>
          </div>
        </div>
      </Transition>
      <ShortenContent
        isShowing={isShowing}
        shortened={shortened}
        setID={setID}
        setUrl={setUrl}
        setShortened={setShortened}
      />
    </>
  );
};

export default Content;
