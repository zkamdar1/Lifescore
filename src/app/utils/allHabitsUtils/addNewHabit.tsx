import toast from "react-hot-toast";
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
    try {
        setAllHabits([...allHabits, newHabit]);
        toast.success("Habit added successfully!");
    } catch (error) {
        toast.error("Something went wrong!...")
    }
}
