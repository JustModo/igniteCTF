import React from "react";

export default function IntroCard() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-center">What do we call you?</h1>
      <input
        id="name-input"
        className="rounded-lg bg-slate-900 outline-none pl-3 mt-3"
        placeholder="Enter you name"
        style={{ fontSize: "0.9rem" }}
      />
      <button
        className="outline outline-white mt-10 px-2 rounded-lg text-center"
        style={{ fontSize: "0.9rem" }}
      >
        Begin
      </button>
    </div>
  );
}