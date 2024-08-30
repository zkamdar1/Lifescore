import { HabitType, AreaType } from "../../Types/GlobalTypes";
import toast from "react-hot-toast";
import { iconToText } from "../../Pages/AllHabits/Components/IconsWindow/IconData";
import { icon, IconProp } from "@fortawesome/fontawesome-svg-core";
import scheduleNotification from "../../notifFunction";

export default function convertIconsToTextOfHabits(habit: HabitType) {
    const { icon, areas } = habit;
    const habitIconToText = iconToText(icon as IconProp);
    const areasCopy = areas.map((area) => ({
        ...area,
        icon: iconToText(area.icon as IconProp)
    }));
    const updatedHabit = { ...habit, icon: habitIconToText, areas: areasCopy };

    return updatedHabit;
}

export async function editHabit({
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

        const updatedHabit = convertIconsToTextOfHabits(habit);

        const response = await fetch(
            `api/habits?habitId=${currentHabitSelected._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updatedHabit.name,
                    icon: updatedHabit.icon,
                    areas: updatedHabit.areas,
                    frequency: updatedHabit.frequency,
                    notificationTime: updatedHabit.notificationTime,
                    isNotificationOn: updatedHabit.isNotificationOn,
                    completedDays: updatedHabit.completedDays,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Something went wrong");
            return;
        }
        const data = await response.json();

        setAllHabits(copyAllHabits);
        toast.success("Habit has been updated successfully!");

        if (updatedHabit.isNotificationOn) {
            scheduleNotification(
                updatedHabit.notificationTime,
                updatedHabit.frequency[0].days,
                updatedHabit.name
            );
        }
    } catch (error) {
        toast.error("Something went wrong")
    }
}
