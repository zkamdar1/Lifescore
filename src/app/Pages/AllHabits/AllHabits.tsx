import React from "react";
import AllHabitsTopBar from "./Components/TopBar";
import RightSideBar from "./Components/RightSideBar";
import HabitsContainer from "./Components/HabitsContainer";
import HabitsCompleted from "./Components/HabitsCompleted";


function AllHabits() {
    return (
        <div className="w-full flex bg-slate-50">
            <div className="w-[80%] m-5">
                <AllHabitsTopBar />
                <HabitsContainer />
                <HabitsCompleted />
            </div>

            <RightSideBar />
        </div>
    );
}

export default AllHabits;
