import { NextResponse } from "next/server";
import connectToDB from "../../lib/connectToDB";
import Area from "../../Models/AreaSchema";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const { name, icon, clerkUserId } = await req.json();

        const area = new Area({
            name,
            icon,
            clerkUserId,
        });

        const savedArea = await area.save();

        return NextResponse.json({ area: savedArea });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, {status: 400});
    }
}

export async function  GET(req: any) {
    try {
        const clerkId = req.nextUrl.searchParams.get("clerkId");
        await connectToDB();
        const areas = await Area.find({ clerkUserId: clerkId });
        return NextResponse.json({ areas: areas });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function DELETE(request: any) {
    try {
        const { areaId } = await request.json();

        const areaToDelete = await Area.findOneAndDelete({
            _id: areaId,
        });

        if (!areaToDelete) {
            return NextResponse.json({ message: "Tag not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Tag deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}

export async function PUT(req: any) {
    try {
        const areaId = req.nextUrl.searchParams.get("areaId");
        const { name, icon } = await req.json();

        if (!areaId) {
            return NextResponse.json(
                { message: "tag ID is required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const updateArea = await Area.findByIdAndUpdate(
            { _id: areaId },
            {
                $set: {
                    name,
                    icon,
                },
            },
            { returnDocument: "after" }
        );

        return NextResponse.json({
            message: "Tag has been updated successfully!",
            habit: updateArea.value,
        });

    } catch (error) {
        console.error("Error updating tag:", error);
    }
}
