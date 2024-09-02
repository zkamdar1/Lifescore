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
