import React, { useContext, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ClipBoard from "../assets/clipboard.svg";
import IncorrectModal from "../components/IncorrectModal";
import HintModal from "../components/HintModal";
import { ChallengeContext } from "../components/ProgressContext";
import SuccessModal from "../components/SuccessModal";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Challenge5() {
  const pythonCode = `
import base64
import math

def main():
    try:
        user_input = int(input("Enter the value of 5 factorial: "))
        if user_input == math.factorial(5):
            decoded_flag = base64.b64decode(
                "aWduaXRlQ1RGe3RpbWVfdG9fY29kZX0=").decode("utf-8")
            print(f"Congratulations! The flag is: {decoded_flag}")
        else:
            print("Incorrect value. Try again.")
    except ValueError:
        print("Invalid input. Please enter an integer.")

if __name__ == "__main__":
    main()
  `;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pythonCode);
      console.log("Text copied to clipboard successfully:", pythonCode);
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
    }
  };

  const [userFlag, setUserFlag] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isComplete, setIsComplete] = useState(null);
  const answer = "igniteCTF{time_to_code}";

  const { completeChallenge, userData } = useContext(ChallengeContext);

  useEffect(() => {
    if (!userData) return;
    setIsComplete(userData.c.c5);
  }, [userData]);

  function handleClick() {
    if (userFlag.trim().toLowerCase() === answer.toLowerCase()) {
      // progress = progress + 1;
      completeChallenge(5); //challenge number
      setShowSuccess(true);
    } else {
      setShowModal(true);
    }
  }
  const handleHintClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmHint = () => {
    setShowConfirmation(false);
    setShowHint(true);
    console.log("Hint viewed, points deducted.");
  };
  return (
    <>
      <div className="flex flex-col w-full h-full justify-between">
        <BackButton />
        <div className="flex flex-col w-full p-4 justify-between items-center ">
          <h1 className="mb-10">Challenge 5</h1>
          <p className="text-base text-justify mb-5">
            If you want to befriend the computer you must know how to talk to
            it, that's what coding is all about.
          </p>
          <div
            className="w-full h-10 mt-4 rounded-tr-xl rounded-tl-xl flex items-center justify-end"
            style={{ backgroundColor: "rgb(68, 68, 68)" }}
          >
            <div
              className="mr-3 btn btn-link"
              style={{
                backgroundImage: `url(${ClipBoard})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              onClick={copyToClipboard}
            />
          </div>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            className="w-full"
            customStyle={{
              fontSize: "14px",
              paddingLeft: "20px",
              paddingRight: "20px",
              margin: 0,
            }}
          >
            {pythonCode}
          </SyntaxHighlighter>
          <p className="text-sm text-justify px-3 mt-5">
            {`Use the word as the flag in the format:`}
          </p>
          <p className="text-sm text-justify px-3 text-teal-500">{`igniteCTF{XXXX}`}</p>
          <div
            className="mt-5 rounded-lg text-center bg-green-500 text-white"
            onClick={handleHintClick}
          >
            <p className="text-sm px-4 py-2 cursor-pointer">HINT</p>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center px-5">
          <input
            id="answer"
            className={`rounded-lg bg-slate-900 outline-none pl-3  w-full py-1 ${
              isComplete ? "placeholder:text-green-500" : ""
            }`}
            placeholder={isComplete ? answer : "Answer"}
            style={{ fontSize: "0.9rem" }}
            onChange={(e) => setUserFlag(e.target.value)}
            disabled={isComplete}
          />
          <button
            className={`outline ${
              isComplete ? "outline-slate-700" : "outline-white"
            } mt-5 px-2 rounded-lg text-center w-full btn bg-black text-white`}
            style={{ fontSize: "0.9rem" }}
            onClick={handleClick}
            disabled={isComplete}
          >
            Submit
          </button>
        </div>
      </div>
      <IncorrectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Incorrect"
        message="The flag you entered is incorrect. Please try again."
      />
      <HintModal
        show={showHint}
        onClose={() => setShowHint(false)}
        title="Hint"
        message="Execute this code using an online python compiler"
        id={5}
      />
      <SuccessModal show={showSuccess} />
      <ConfirmationModal
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmHint}
        title="Are you sure?"
        message="Viewing the hint will affect your points. Do you want to proceed?"
      />
    </>
  );
}
