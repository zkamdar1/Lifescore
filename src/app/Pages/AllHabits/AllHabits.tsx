import React from "react";
import AllHabitsTopBar from "./Components/TopBar";
import RightSideBar from "./Components/RightSideBar";
import HabitsContainer from "./Components/HabitsContainer";
import HabitsCompleted from "./Components/HabitsCompleted";
import HabitWindow from "./Components/HabitWindow";
import { Toaster } from "react-hot-toast";
import TagsContainer from "./Components/TagsContainer";

function AllHabits() {
    return (
        <div className="max-lg:flex-col w-full flex flex-row gap-0 relative">
            <Toaster />
            <HabitWindow />
            <div className="flex-col flex-grow m-3">
                <AllHabitsTopBar />
                <TagsContainer />
                <HabitsContainer />
                <HabitsCompleted />
            </div>

            <RightSideBar />
        </div>
    );
}

export default AllHabits;
