import React from "react";
import UserProfile from "./RightSideBar/UserProfile";
import MainStatistics from "./RightSideBar/MainStatistics";
import Calendar from "./RightSideBar/Calendar";

function RightSideBar() {
  return (
    <div className="w-[30%] flex flex-col items-center-center bg-white">
      <UserProfile />
      <MainStatistics />
      <Calendar />
    </div>
  )
}

export default RightSideBar;
