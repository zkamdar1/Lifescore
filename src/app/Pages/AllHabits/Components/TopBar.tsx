import React from "react";
import SearchBar from "./SearchBar";
import DarkMode from "./DarkMode";

function TopBar() {
  return (
    <div className="bg-white p-5 rounded-md flex justify-between">
      <div className="flex flex-col">
        <span className="text-xl">
          <span className="font-medium">Hi There</span>
          <span className="font-light">, Kamdar</span>
        </span>
        <span className="font-light text-[14px] text-gray-400">
          welcome back!
        </span>
      </div>
      <div className="w-[50%] flex gap-3 justify-between">
        <SearchBar />
        <DarkMode />
      </div>
    </div>
  );
}

export default TopBar;