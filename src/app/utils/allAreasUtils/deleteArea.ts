import { Dispatch, SetStateAction } from "react";
import { AreaType, HabitType } from "../../Types/GlobalTypes";
import toast from "react-hot-toast";
import { iconToText } from "../../Pages/AllHabits/Components/IconsWindow/IconData";

export async function deleteArea(
  selectedArea: AreaType,
  allAreas: AreaType[],
  setAllAreas: Dispatch<SetStateAction<AreaType[]>>,
  allHabits: HabitType[],
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>
) {
  try {
    const updatedAreas: AreaType[] = allAreas.filter(
      (area) => area._id !== selectedArea?._id
    );

    const updateAllHabits: HabitType[] = allHabits.map((habit) => {
        if (habit.areas.some((area) => area._id !== selectedArea?._id)) {
            return {
                ...habit,
                areas: habit.areas.filter((area) => area._id !== selectedArea?._id),
            }
        } else {
            return habit;
        }
    });
      
    const convertIconToTextAllHabits: HabitType[] = updateAllHabits.map(
        (habit) => {
            return {
                ...habit,
                icon: iconToText(habit.icon),
                areas: habit.areas.map((area) => ({
                    ...area,
                    icon: iconToText(area.icon),
                })),
            };
        }
    );
      
    convertIconToTextAllHabits.forEach((habit) => {
        updateHabitsInMongoDB(habit);
    });
      
    const response = await fetch("/api/areas", {
      method: "DELETE",
      headers: {
        "Content-Type": "applications/json",
      },

      body: JSON.stringify({ areaId: selectedArea?._id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();
    toast.success("Tag has been deleted successfully!");
    setAllAreas(updatedAreas);
    setAllHabits(updateAllHabits);
    return { success: true, message: data.message };
  } catch (error) {
    toast.error("Something went wrong");
  }
}

async function updateHabitsInMongoDB(habit: HabitType) {
    try {
        const response = await fetch(
        `api/habits?habitId=${habit._id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: habit.name,
                icon: habit.icon,
                areas: habit.areas,
                frequency: habit.frequency,
                notificationTime: habit.notificationTime,
                isNotificationOn: habit.isNotificationOn,
                completedDays: habit.completedDays,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Something went wrong");
            return;
        }
    } catch (error) {
        toast.error("Something went wrong");
    }
}
