import { SignIn } from '@clerk/nextjs';
import React from 'react';

function SignInPage() {
    const defaultColor = "#2f219c";
    const gradientColor = `linear-gradient(to bottom, ${defaultColor}, #ff0440)`;

    return (
        <div
            style={{ background: gradientColor }}
            className="flex justify-center items-center flex-col gap-10 w-full h-screen"
        >
            <SignIn />
        </div>
    );
}

export default SignInPage;
