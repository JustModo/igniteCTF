import React from "react";

export default function RulesModal({ show, onClose, title }) {
  if (!show) return null;

  const message = `1. You need to submit all the flags in igniteCTF{xxx} format.
  2. First one to solve all the challenges wins.
  3. Incase of a tie, the one who has used the least hints, wins.
  4. Players are encouraged to search the web for suitable tools to solve the problems.
  5. Most importantly, have fun 😉`;

  const messageLines = message.split("\n");

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="mt-2 px-7 py-3">
            {messageLines.map((line, index) => (
              <p key={index} className="text-sm text-gray-500 text-justify">
                {line}
              </p>
            ))}
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
