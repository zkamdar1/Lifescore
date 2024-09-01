import { useGlobalContextProvider } from "@/src/app/contextApi";
import { darkModeColor } from "@/colors";
import StatisticsHabitCard from "./StatisticsHabitCard";

function StatisticsHabitArea() {
    const {
        allHabitsObject: { allHabits },
        darkModeObject: { isDarkMode },
    } = useGlobalContextProvider();

    return (
        <div
            style={{
                backgroundColor: isDarkMode ? darkModeColor.background : 
                "white",
            }}
            className="p-4 mt-4 rounded-md"
        >
            {allHabits.map((habit, index) => (
                <div key={index}>
                    <StatisticsHabitCard habit={habit} />
                </div>
            ))}
        </div>
    );
}

export default StatisticsHabitArea;
