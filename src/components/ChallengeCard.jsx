import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChallengeCard({ title, path, complete }) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-11/12 ${
        complete
          ? "bg-slate-800 text-slate-500 line-through"
          : "bg-slate-900 text-white outline outline-slate-900"
      } h-16 flex items-center justify-center cursor-pointer btn `}
      onClick={() => navigate(path)}
    >
      <h1 className="text-sm text-center">{title}</h1>
    </div>
  );
}
