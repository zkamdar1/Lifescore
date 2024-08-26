"use client";

import React from "react";
import Appicon from "../SVG_icons/Appicon";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import LogoAndName from "../Components/LogoAndName";

function Navbar() {
    const { userId } = useAuth();
    const defaultColor = "#2f219c";
    const backgroundColorObject = { backgroundColor: defaultColor };
  
    return (
      <header>
        <div className=" p-8 px-20 ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left mb-7 sm:mb-0">
              {/* Icon + App name */}
              {/* --------------- */}
              <LogoAndName />
            </div>
            {/* Buttons */}
            <div>
              {userId ? (
                <Link href={"/dashboard"}>
                  <button
                    style={backgroundColorObject}
                    className={`block rounded-lg px-5 py-3 text-sm font-medium text-white transition`}
                    type="button"
                  >
                    Dashboard
                  </button>
                </Link>
              ) : (
                <div
                 className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                    <Link href={"/sign-in"}>
                        <button
                            style={backgroundColorObject}
                            className={`block sm:w-32 w-full rounded-lg px-5 py-3 text-sm font-medium text-white transition  focus:outline-none`}
                            type="button"
                        >
                            Sign In
                        </button>
                    </Link>
                                    
                    <Link href={"/sign-up"}>
                        <button
                            className={`block sm:w-32 w-full border rounded-lg px-5 py-3 text-sm font-medium  transition focus:outline-none border-customRed text-customRed hover:bg-customRed hover:text-white`}
                            type="button"
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
};

export default Navbar;