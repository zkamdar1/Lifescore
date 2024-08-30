import { HabitType, AreaType } from "../../Types/GlobalTypes";
import toast from "react-hot-toast";

export function editHabit({
    allHabits,
    setAllHabits,
    selectedItems,
    habit,
}: {
    allHabits: HabitType[];
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    selectedItems: AreaType | HabitType | null;
    habit: HabitType;
}) {
    try {
        const currentHabitSelected = selectedItems as HabitType;
        const findTheHabit = allHabits.findIndex(
            (singleHabit) => singleHabit._id === currentHabitSelected._id
        );
        const copyAllHabits = [...allHabits];
        copyAllHabits[findTheHabit] = habit;
        setAllHabits(copyAllHabits);
        toast.success("Habit has been updated successfully!");
    } catch (error) {
        toast.error("Something went wrong")
    }
}
