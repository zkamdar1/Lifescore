import { HabitType } from "../../Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";

export function addNewHabit({
    allHabits,
    setAllHabits,
    newHabit,
}: {
    allHabits: HabitType[],
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
        newHabit: HabitType;
}) {
    setAllHabits([...allHabits, newHabit]);
}
