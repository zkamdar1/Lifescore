import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

function UserProfile() {
    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-14 h-14",
            userButtonPopoverActionButton: "text-purple-600",
        },
    };

    const { user } = useUser();

    return (
        <div className="flex flex-col gap-3 items-center justify-center mt-9">
            <UserButton appearance={userButtonAppearance} />
            <div>
                <span>{user?.fullName}</span>
            </div>
        </div>
    );
}

export default UserProfile;