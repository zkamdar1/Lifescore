import React, { useState } from "react";
import TagsTopBar from "./Components/AllTagsTopBar";
import AllTagsContainer from "./Components/AllTagsContainter";
import DropDown from "../../Dropdown";
import ConfirmationWindow from "../../ConfirmationWindow";
import { useGlobalContextProvider } from "../../contextApi";
import IconWindow from "../AllHabits/Components/IconsWindow/IconWindow";
import { Toaster } from "react-hot-toast";


function Tags() {
  

  return (
    <div className="w-full h-screen p-3 relative">
      <Toaster />
      <DropDown />
      <ConfirmationWindow />
      <TagsTopBar />
      <AllTagsContainer />
    </div>
  );
}

export default Tags;
