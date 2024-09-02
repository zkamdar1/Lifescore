import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { defaultColor, darkModeColor } from "@/colors";
import { HabitType } from "@/src/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/src/app/utils/allHabitsUtils/DateFunction";
import { calculateStreak, calculateTotalPerfectDays } from "../../../Statistics/Components/StatisticsBoard";

function MainStatistics() {
    const { darkModeObject, allHabitsObject, selectedCurrentDayObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { allHabits } = allHabitsObject;
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const [statisticsInfo, setStatisticsInfo] = useState([
      { id: 1, num: 7, subTitle: "Best Streak" },
      { id: 2, num: 10, subTitle: "Perfect Days" },
    ]);
    const [progess, setProgress] = useState<number>(0);
    
    function calculatePercentageOfTodaysProgress(allHabits: HabitType[]): number {
        if (allHabits.length === 0 || !selectedCurrentDate) {
          return 0;
        }
      
      let totalHabitsCompletedDays = 0;
      let totalHabitsOfCurrentDay = 0;

      if (allHabits) {
        const completedHabitsOfCurrentDate: HabitType[] = allHabits.filter(
          (habit) =>
            habit.completedDays.some((day) => day.date === selectedCurrentDate)
        );

        totalHabitsCompletedDays = completedHabitsOfCurrentDate.length;

        const getTwoLettersOfCurrentDay = getCurrentDayName(
          selectedCurrentDate
        ).slice(0, 2);

        const allHabitsOfCurrentDay = allHabits.filter((habit) =>
          habit.frequency[0].days.some((day) => day === getTwoLettersOfCurrentDay)
        );

        totalHabitsOfCurrentDay = allHabitsOfCurrentDay.length;

        const result =
          (totalHabitsCompletedDays / totalHabitsOfCurrentDay) * 100;
        
        if (result === undefined || isNaN(result)) {
          return 0;
        }
        return result ?? 0;
      }
      return 0;
    }
  
    useEffect(() => {
      setProgress(calculatePercentageOfTodaysProgress(allHabits));
    }, [selectedCurrentDate, allHabits]);
  
    useEffect(() => {
      const streaks = allHabits.map((habit) => calculateStreak(habit));
      const totalStreak = streaks.reduce((a, b) => a + b, 0);
      const perfectDays = calculateTotalPerfectDays(allHabits);

      const copyStatsInfo = [...statisticsInfo];
      copyStatsInfo[0].num = totalStreak;
      copyStatsInfo[1].num = perfectDays;
      setStatisticsInfo(copyStatsInfo);
    }, [allHabits]);

    return (
      <div
        style={{
          backgroundColor: isDarkMode
            ? darkModeColor.backgroundSlate
            : defaultColor.backgroundSlate,
        }}
        className="flex mx-4 flex-col gap-6 justify-center items-center mt-14 rounded-xl p-5 pt-7"
      >
        <span className="font-bold text-xl cursor-pointer hover:text-customRed">
          Statistics
        </span>
        {/* Circular Progress Bar */}
        <div className="relative pt-3">
          <CircularProgressBar progress={progess} />
          <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="font-bold text-xl text-customRed">{`${progess}%`}</span>
            <span className="text-[11px]">{`Today's Progress`}</span>
          </div>
        </div>
        {/* best steak & perfect days */}
        <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
          {statisticsInfo.map((singleItem, singleItemIndex) => (
            <div className="flex items-center gap-3" key={singleItemIndex}>
              <div className="w-2 h-2 bg-customRed rounded-full"></div>
              <div className="text-[12px]">
                <span className="flex flex-col font-bold">{singleItem.num}</span>
                <span
                  style={{
                    color: isDarkMode
                      ? darkModeColor.textColor
                      : defaultColor[50],
                  }}
                  className=""
                >
                  {singleItem.subTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

interface CircularProgressBarProps {
    progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    progress,
}) => {
    const data = [
        { name: "Completed", value: progress },
        { name: "Remaining", value: 100 - progress },
    ];

    const COLORS = [defaultColor.default, "#edf2f4"];

    return (
        <PieChart
            width={200}
            height={160}
            margin={{top: -20, right: 0, bottom: 40, left: 0}}
        >
            <Pie
                data={data}
                cx={100}
                cy={100}
                startAngle={180}
                endAngle={-180}
                innerRadius={66}
                outerRadius={progress === 100 ? 80 : 78}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
}

export default MainStatistics;