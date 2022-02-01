import { Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

const Button: FC<{ showShortened: boolean; resetStates: Function }> = ({
  showShortened,
  resetStates,
}) => {
  return (
    <>
      <div className="absolute flex w-full top-[90%]">
        <Transition
          as={Fragment}
          show={showShortened}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 rotate-[-120deg] scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          <button
            className="relative inline-flex mx-auto my-8 items-center justify-center p-0.5 h-min w-max overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
            onClick={() => resetStates()}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-100 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Shorten another!
            </span>
          </button>
        </Transition>
      </div>

      <div className="absolute flex w-full top-[90%]">
        <Transition
          as={Fragment}
          show={!showShortened}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 rotate-[-120deg] scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          <button
            className="relative inline-flex mx-auto my-8 items-center justify-center p-0.5 h-min w-min overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
            type="submit"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-100 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Generate
            </span>
          </button>
        </Transition>
      </div>
    </>
  );
};

export default Button;
