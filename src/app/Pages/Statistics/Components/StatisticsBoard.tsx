import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { HabitType } from "@/src/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/src/app/utils/allHabitsUtils/DateFunction";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBorderAll, faChartSimple, faCheck, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type StatisticsCard = {
    id: number;
    icon: IconProp;
    counter: number;
    text: string;
}

export default function StatisticsBoard() {
    const [statisticsCard, setStatisticsCard] = useState<StatisticsCard[]>([
      { id: 1, icon: faFaceSmile, counter: 5, text: "Total Habits" },
      { id: 2, icon: faBorderAll, counter: 3, text: "Perfect Days" },
      { id: 3, icon: faChartSimple, counter: 1.3, text: "Average Per Day" },
      { id: 4, icon: faCheck, counter: 13, text: "Best Streak" },
    ]);

    const [windowWidth, setWindowWidth] = useState(0);

    const {
        darkModeObject: { isDarkMode },
        allHabitsObject: { allHabits },
        selectedCurrentDayObject: { selectedCurrentDate },
        
    } = useGlobalContextProvider();

    const filteredStatisticCard =
        windowWidth < 640
            ? statisticsCard.filter((card) => card.text !== "Average Per Day")
            : statisticsCard;
    
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const dateCounts: { [key: string]: number } = {};

        allHabits.forEach((habit) => {
            habit.completedDays.forEach((day) => {
                const date = day.date;
                if (dateCounts[date]) {
                    dateCounts[date] += 1;
                } else {
                    dateCounts[date] = 1;
                }
            });
        });

        const perfectDayCount = calculateTotalPerfectDays(allHabits);

        let totalHabitsInEachDay: { [key: string]: number } = {};
        const uniqueDates = Object.keys(dateCounts);
        for (const date of uniqueDates) {
            const getTwoFirstDayLetter = getCurrentDayName(date).slice(0, 2);

            const numberOfHabitsEachDay = allHabits.filter((singleHabit) => {
                return singleHabit.frequency[0].days.some(
                    (day) => day === getTwoFirstDayLetter
                );
            });

            totalHabitsInEachDay[date] = numberOfHabitsEachDay.length;
        }

        let totalCompleteHabits = 0;
        Object.values(dateCounts).forEach((habitCount) => {
            totalCompleteHabits += habitCount;
        });

        let averagePerDay = "0";
        if (uniqueDates.length > 0) {
          averagePerDay = (totalCompleteHabits / uniqueDates.length).toFixed(2);
        } else {
          averagePerDay = "0"; 
        }


        const streaks = allHabits.map((habit) => calculateStreak(habit));
        const totalStreaks = streaks.reduce((a, b) => a + b, 0);

        const copyStatisticsCard = [...statisticsCard];
        copyStatisticsCard[0].counter = allHabits.length;
        copyStatisticsCard[1].counter = perfectDayCount;
        copyStatisticsCard[2].counter = parseFloat(averagePerDay);
        copyStatisticsCard[3].counter = totalStreaks;

        setStatisticsCard(copyStatisticsCard);
    }, [allHabits]);
    
    return (
        <div
            style={{
                backgroundColor: isDarkMode ? darkModeColor.background : "white",
                color: isDarkMode ? darkModeColor.textColor : "black",
            }}
            className="p-5 mt-4 rounded-md grid grid-cols-4 gap-4 max-sm:grid-cols-3"
        >
            {filteredStatisticCard.map((singleCard, singleIndex) => (
                <div
                    style={{
                        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
                    }}
                    key={singleIndex}
                    className="flex flex-col gap-1 items-start p-5 rounded-md"
                >
                    <FontAwesomeIcon
                        className="text-customRed"
                        icon={singleCard.icon}
                    />
                    <span
                        className="font-bold text-xl mt-3"
                    >{singleCard.counter}</span>
                    <span
                        className="font-light text-sm"
                    >{singleCard.text}</span>
                </div>
            ))}
        </div>
    );
}

export function calculateStreak(habit: HabitType): number {
    function getDayOfWeek(dateString: string): string {
        const date = new Date(dateString);
        const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        return days[date.getUTCDay()];
    }

    const completedDays = habit.completedDays.map((day) => day.date);
    const frequency = habit.frequency[0].days;
    const completedDaysOfWeek = completedDays.map(getDayOfWeek);

    let streak = 0;
    let maxStreak = 0;
    let lastIndex = -1;

    for (let i = 0; i < completedDaysOfWeek.length; i++) {
        const day = completedDaysOfWeek[i];
        const currentIndex = frequency.indexOf(day);

        if (currentIndex === -1) {
            streak = 0;
        } else {
            if (
                lastIndex === -1 ||
                currentIndex === (lastIndex + 1) % frequency.length
            ) {
                streak++;
            } else {
                streak = 1;
            }
            lastIndex = currentIndex;
            maxStreak = Math.max(maxStreak, streak);
        }
    }
    return streak;
}

export function calculateTotalPerfectDays(allHabits: HabitType[]): number {
    const dateCounts: { [key: string]: number } = {};

    allHabits.forEach((habit) => {
        habit.completedDays.forEach((day) => {
            const date = day.date;
            if (dateCounts[date]) {
                dateCounts[date] += 1;
            } else {
                dateCounts[date] = 1;
            }
        });
    });

    let perfectDayCount = 0;
    let totalHabitsInEachDay: { [key: string]: number } = {};
    const uniqueDates = Object.keys(dateCounts);

    uniqueDates.forEach((date) => {
        const getTwoFirstDayLetter = getCurrentDayName(date).slice(0, 2);

        const numberOfHabitsEachDay = allHabits.filter((singleHabit) => {
            return singleHabit.frequency[0].days.some(
                (day) => day === getTwoFirstDayLetter
            );
        });

        totalHabitsInEachDay[date] = numberOfHabitsEachDay.length;
    });

    for (const date in totalHabitsInEachDay) {
        if (totalHabitsInEachDay[date] === dateCounts[date]) {
            perfectDayCount++;
        }
    }

    return perfectDayCount;
}
