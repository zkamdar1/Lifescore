import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { HabitType } from "@/src/app/Types/GlobalTypes";
import { faBook, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { calculateStreak } from "./StatisticsBoard";

export default function StatisticsHabitCard({ habit }: { habit: HabitType }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        darkModeObject: { isDarkMode },
    } = useGlobalContextProvider();
    const recurringDaysText = habit.frequency[0].days.join(", ");

    function calculateConsistency(habit: HabitType): number {
        const consistency =
          (calculateStreak(habit) / habit.completedDays.length) * 100;
        
        if (consistency === undefined || isNaN(consistency)) {
            return 0;
        }
        return consistency;
    }

    return (
        <div
            style={{
                backgroundColor: isDarkMode 
                    ? darkModeColor.backgroundSlate
                    : defaultColor.backgroundSlate,
                color: isDarkMode ? darkModeColor.textColor : "black",
            }}
            className="p-5 rounded-md m-3 mb-6"
        >
            <div
                className="flex justify-between items-center"
            >
                <div
                    className="flex gap-3 items-center"
                >
                    <div
                        className="bg-customRed w-10 h-10 rounded-full p-3 flex items-center justify-center text-white"
                    >
                        <FontAwesomeIcon
                            icon={faBook}
                        />
                    </div>
                    <span>{habit.name}</span>
                    {habit.isNotificationOn && (
                        <span
                            style={{
                                backgroundColor: defaultColor[100],
                                color: defaultColor.default
                            }}
                            className="p-1 text-sm px-3 rounded-md"
                        >
                            {habit.notificationTime}
                        </span>
                    )}
                </div>
                <div>
                    <span
                        className="text-gray-400"
                    >
                        {recurringDaysText}
                    </span>
                </div>
            </div>
            <div
                className="mt-5 p-2 grid grid-cols-3"
            >
                <div
                    className="flex flex-col gap-1 justify-center items-center"
                >
                    <span className="font-bold">{habit.completedDays.length}</span>
                    <span>Total</span>
                </div>
                <div
                    className="flex flex-col gap-1 justify-center items-center"
                >
                    <span className="font-bold">{calculateConsistency(habit).toFixed(0)}%</span>
                    <span>Consistency</span>
                </div>
                <div
                    className="flex flex-col gap-1 justify-center items-center"
                >
                    <span className="font-bold">{calculateStreak(habit)}</span>
                    <span>Streaks</span>
                </div>
            </div>

            <div
                style={{
                    backgroundColor: isDarkMode
                        ? darkModeColor.backgroundSlate
                        : defaultColor.backgroundSlate,
                }}
                className={`w-full mt-8 flex justify-center transition-all ${
                    isExpanded ? "h-48" : "h-0"
                }`}
            >
                <div
                    className={`w-[600px] ${ isExpanded ? "block" : "hidden"}`}
                >
                    <HabitHeatmap habit={habit} />
                </div>
            </div>
            <div
                className="flex justify-end mt-3"
            >
                <FontAwesomeIcon
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="cursor-pointer"
                    icon={isExpanded ? faChevronUp : faChevronDown}
                />
            </div>
        </div>
    );
}

type DateData = {
    date: string,
    count: number,
};

function transformToDateData(habit: HabitType): DateData[] {
    const dateMap: { [date: string]: number } = {};

    habit.completedDays.forEach((day) => {
        if (dateMap[day.date]) {
            dateMap[day.date]++;
        } else {
            dateMap[day.date] = 1;
        }
    });

    return Object.keys(dateMap).map((date) => ({
        date: date,
        count: dateMap[date],
    }));
}

const HabitHeatmap = ({ habit }: { habit: HabitType }) => {
    const dateData: DateData[] = transformToDateData(habit);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 6);

    return (
        <div>
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={dateData}
                showMonthLabels={true}
                showWeekdayLabels={true}
                classForValue={(value) => {
                    if (!value) {
                        return "color-empty";
                    }
                    return `color-scale-4`
                }}
            />
        </div>
    );
}
