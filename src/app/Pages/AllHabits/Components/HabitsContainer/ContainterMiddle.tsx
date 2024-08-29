import React, { useEffect, useState } from "react";
import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { HabitType } from "@/src/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/src/app/utils/allHabitsUtils/DateFunction";
import EmptyHabitsPlaceHolder from "@/src/app/EmptyPlaceHolders/HabitsEmptyPlaceHolder";
import HabitCard from "../SingleHabitCard";
import { SuccessIcon } from "@/src/app/assets/SuccessIcon";

export default function ContainerMiddle() {
  const { allHabitsObject, selectedCurrentDayObject, selectedTagStringObject, allFilteredHabitsObject } = useGlobalContextProvider();
  const { allHabits } = allHabitsObject;
  const { allFilteredHabits, setAllFilteredHabits } = allFilteredHabitsObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { selectedTagString } = selectedTagStringObject;

  useEffect(() => {
    const getTwoFirstDayLetter = getCurrentDayName(selectedCurrentDate).slice(
      0,
      2
    );

    let filteredHabitsByTag: HabitType[] = [];

    const filteredHabitsByFrequency = allHabits.filter((singleHabit) => {
      return singleHabit.frequency[0].days.some(
        (day) => day === getTwoFirstDayLetter
      );
    });

    if (selectedTagString != "All") {
      filteredHabitsByTag = filteredHabitsByFrequency.filter((habit) =>
        habit.areas.some((area) => area.name === selectedTagString)
      );
    } else {
      filteredHabitsByTag = filteredHabitsByFrequency;
    }

    setAllFilteredHabits(filteredHabitsByTag);
  }, [selectedCurrentDate, allHabits, selectedTagString]);

  const isAllHabitsCompleted =
    allFilteredHabits.length > 0 &&
    allFilteredHabits.every((habit) => {
      return habit.completedDays.some(
        (day) => day.date === selectedCurrentDate
      );
    });

  return (
    <div className="p-3">
      {allFilteredHabits.length === 0 ? (
        <EmptyHabitsPlaceHolder />
      ) : (
          <>
            {isAllHabitsCompleted && (
              <div className="flex justify-center items-center p-5 flex-col">
                <SuccessIcon color={defaultColor[50]} />
                <span className="text-[13px] text-gray-400 w-64 text-center mt-6">
                  {`Great job! You've completed all your habits for today! `}
                </span>
              </div>
            )}
            {allFilteredHabits.map((singleHabit, singleHabitIndex) => (
              <div key={singleHabitIndex}>
                {singleHabit.completedDays.some(
                  (day) => day.date === selectedCurrentDate
                ) === false && <HabitCard singleHabit={singleHabit} />}
              </div>
            ))}
          </>
      )}
    </div>
  );
}
