import React from "react";
import AllHabitsTopBar from "./Components/TopBar";
import RightSideBar from "./Components/RightSideBar";


function AllHabits() {
    return (
        <div className="w-full flex bg-slate-50">
            <div className="w-[80%] m-5">
                <AllHabitsTopBar />
            </div>

            <RightSideBar />
        </div>
    );
}

export default AllHabits;
