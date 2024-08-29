import { CalendarIcon } from "../assets/CalendarIcon";
import { defaultColor } from "@/colors";

export default function EmptyHabitsPlaceHolder() {
    return (
        <div
            className="flex justify-center items-center p-5 flex-col"
        >
            <CalendarIcon color={defaultColor[50]} />
            <span className="text=[13px] text-gray-400">
                Nothing Scheduled For Today!
            </span>
        </div>
    );
}
