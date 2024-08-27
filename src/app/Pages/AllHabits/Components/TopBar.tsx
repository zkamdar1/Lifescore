import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import DarkMode from "./DarkMode";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/src/app/contextApi";

function TopBar() {
  const { openSideBarObject } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10",
      userButtonPopoverActionButton: "text-purple-600",
    },
  };

  function openSideBarFunction() {
    setOpenSideBar(!openSideBar);
  }

  useEffect(() => {
    function handleResize() {
      setOpenSideBar(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white p-5 rounded-md flex justify-between">
      <div className="flex gap-4">
        <div className="max-lg:flex hidden">
          <UserButton appearance={userButtonAppearance} />
        </div>
        <div className="flex flex-col max-md:hidden">
          <span className="text-xl">
            <span className="font-medium">Hi There</span>
            <span className="font-light">, Kamdar</span>
          </span>
          <span
            className="font-light text-[14px] text-gray-400"
          >
            welcome back!
          </span>
        </div>
      </div>
      <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-between">
        <SearchBar />
        <DarkMode />
        <FontAwesomeIcon
          onClick={openSideBarFunction}
          className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
          icon={faBars}
        />
      </div>
    </div>
  );
}

export default TopBar;