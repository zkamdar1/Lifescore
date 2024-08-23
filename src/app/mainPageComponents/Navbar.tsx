import React from "react";
import Appicon from "../SVG_icons/Appicon";

function Navbar() {
    const defaultColor = "#2f219c";
    const backgroundColorObject = { backgroundColor: defaultColor };
    return (
        <header>
            <div className=" p-8 px-20 ">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left mb-7 sm:mb-0">
                        {/* Icon + App name */}
                        {/* --------------- */}
                        <div
                            className="flex gap-2 items-center sm:justify-start justify-normal">
                            <span className="text-2xl font-light flex items-center gap-2">
                                {/* The icon */}
                                <div
                                    style={backgroundColorObject}
                                    className="p-2 rounded-md">
                                    <Appicon color="#ffffff" height="34" width="34" />
                                </div>
                                {/* Name of App */}
                                <span
                                    style={{ color: "#2f219c" }} className="font-bold text-customRed">
                                    Life
                                </span>
                                <span className="font-light">
                                    Score
                                </span>
                            </span>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                        <button
                            style={backgroundColorObject}
                            className={`block sm:w-32 w-full rounded-lg px-5 py-3 text-sm font-medium text-white transition  focus:outline-none`}
                            type="button">
                            Sign In
                        </button>
                        <button
                            className={`block sm:w-32 w-full border rounded-lg px-5 py-3 text-sm font-medium  transition focus:outline-none border-customRed text-customRed hover:bg-customRed hover:text-white`}
                            type="button">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;