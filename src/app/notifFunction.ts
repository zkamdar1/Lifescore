import { sendNotifications } from "./dashboard/page";

export default function scheduleNotification(
    notificationTime: string,
    days: string[],
    habitName: string
) {
    const daysMap: Record<string, number> = {
        Mo: 0,
        Tu: 1,
        We: 2,
        Th: 3,
        Fr: 4,
        Sa: 5,
        Su: 6,
    };

    const [time, modifier] = notificationTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0; arguments
    
    const notificationDate = new Date();
    notificationDate.setHours(hours);
    notificationDate.setMinutes(minutes);
    notificationDate.setSeconds(0);

    const now = new Date();
    const nowDay = now.getDay();
    const nowTime = now.getTime();

    days.forEach((day) => {
        const targetDay = daysMap[day];

        let diff = targetDay - nowDay;

        if (diff < 0) diff += 7;

        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + diff);
        targetDate.setHours(hours);
        targetDate.setMinutes(minutes);
        targetDate.setSeconds(0);
        
        const timeout = targetDate.getTime() - nowTime;

        setTimeout(() => sendNotifications(habitName), timeout);
    });
}
