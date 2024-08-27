import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";

function SearchBar() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;

    return (
      <div className="w-[75%]">
        <div
          style={{
            backgroundColor: isDarkMode
              ? darkModeColor.backgroundSlate
              : defaultColor.backgroundSlate,
          }}
          className="flex gap-3 items-center p-3 bg-slate-50 rounded-3xl"
        >
          <FontAwesomeIcon
            height={20}
            width={20}
            icon={faSearch}
            className="text-gray-300"
          />
          <input
            style={{
              backgroundColor: isDarkMode
                ? darkModeColor.backgroundSlate
                : defaultColor.backgroundSlate,
            }}
            className={`outline-none text-[14px] font-light bg-slate-50 w-full`}
            placeholder="Search..."
          />
        </div>
      </div>
    );
}

export default SearchBar;
