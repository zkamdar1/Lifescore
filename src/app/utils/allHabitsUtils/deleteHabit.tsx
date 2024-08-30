import { Dispatch, SetStateAction } from "react";
import { HabitType, AreaType } from "../../Types/GlobalTypes";
import toast from "react-hot-toast";

export function deleteHabit(
    allHabits: HabitType[],
    setAllHabits: Dispatch<SetStateAction<HabitType[]>>,
    selectedItems: AreaType | HabitType | null
) {
    try {
        const updatedHabits: HabitType[] = allHabits.filter(
            (habit) => habit._id !== selectedItems?._id
        );
        setAllHabits(updatedHabits);
        toast.success("Habit deleted successfully");
    } catch (error) {
        toast.error("Something went wrong")
    }
}
