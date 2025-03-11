import React from "react";

function RowDropdown({ onSelect }) {
  return (
    <div className="flex flex-col bg-ocean max-w-fit text-white bg-opacity-15 shadow-lg rounded">
      <span
        onClick={() => onSelect(5)}
        className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
      >
        5
      </span>
      <span
        onClick={() => onSelect(10)}
        className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
      >
        10
      </span>
      <span
        onClick={() => onSelect(15)}
        className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
      >
        15
      </span>
    </div>
  );
}

export default RowDropdown;
