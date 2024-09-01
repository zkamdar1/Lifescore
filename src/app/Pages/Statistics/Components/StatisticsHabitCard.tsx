import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { HabitType } from "@/src/app/Types/GlobalTypes";
import { faBook, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";

export default function StatisticsHabitCard({ habit }: { habit: HabitType }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        darkModeObject: { isDarkMode },
    } = useGlobalContextProvider();
    const recurringDaysText = habit.frequency[0].days.join(", ");

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
                    <span className="font-bold">8</span>
                    <span>Total</span>
                </div>
                <div
                    className="flex flex-col gap-1 justify-center items-center"
                >
                    <span className="font-bold">7</span>
                    <span>Perfect Days</span>
                </div>
                <div
                    className="flex flex-col gap-1 justify-center items-center"
                >
                    <span className="font-bold">6</span>
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
                    <HabitHeatmap dateData={dateData} />
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

const dateData: DateData[] = [
  { date: "2024-07-29", count: 1 },
  { date: "2024-08-01", count: 4 },
  { date: "2024-08-01", count: 0 },
  { date: "2024-08-10", count: 1 },
];

const HabitHeatmap = ({ dateData }: { dateData: DateData[] }) => {
    return (
        <div>
            <CalendarHeatmap
                startDate={new Date("2024-01-01")}
                endDate={new Date("2024-08-31")}
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
