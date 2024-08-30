import { NextResponse } from "next/server";
import connectToDB from "../../lib/connectToDB";
import HabitsCollection from "@/src/app/Models/HabitSchema";

export async function POST(req: Request) {
    try {
        const {
            name,
            icon,
            clerkUserId,
            frequency,
            notificationTime,
            isNotificationOn,
            areas,
            completedDays,
        } = await req.json();

        await connectToDB();

        const habit = new HabitsCollection({
            name,
            icon,
            clerkUserId,
            frequency,
            notificationTime,
            isNotificationOn,
            areas,
            completedDays,
        });

        const savedHabit = await habit.save();

        return NextResponse.json({ habit: savedHabit });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function GET(req: any) {
    try {
        const clerkId = req.nextUrl.searchParams.get("clerkId");
        await connectToDB();
        const habits = await HabitsCollection.find({ clerkUserId: clerkId });
        return NextResponse.json({ habits: habits });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function DELETE(request: any) {
    try {
        const { habitId } = await request.json()
        
        const habitToDelete = await HabitsCollection.findOneAndDelete({
            _id: habitId,
        });

        if (!habitToDelete) {
            return NextResponse.json({ message: "habit not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Habit deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}

export async function PUT(request: any) {
    try {
        const habitId = request.nextUrl.searchParams.get("habitId");
        const {
            name,
            icon,
            frequency,
            notificationTime,
            isNotificationOn,
            areas,
            completedDays,
        } = await request.json();

        if (!habitId) {
            return NextResponse.json(
                { message: "Habit ID is required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const updatedHabit = await HabitsCollection.findOneAndUpdate(
            { _id: habitId },
            {
                $set: {
                    name,
                    icon,
                    frequency,
                    notificationTime,
                    isNotificationOn,
                    areas,
                    completedDays,
                },
            },
            { returnDocument: "after" }
        );

        return NextResponse.json(
            {
                message: "Habit successfully updated",
                habit: updatedHabit.value,
             }
        );
    } catch (error) {
        console.error("Error updating habit:", error);
        return NextResponse.json(
            { message: "An error has occured while updating the habit" },
            { status: 500 }
        );
    }
}
