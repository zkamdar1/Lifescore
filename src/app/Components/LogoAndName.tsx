import React from "react";
import Appicon from "../SVG_icons/Appicon";
import { defaultColor } from "@/colors";

function LogoAndName() {
    return (
      <div className="flex gap-2 items-center sm:justify-start justify-normal">
        <span className="text-2xl font-light flex items-center gap-2">
          {/* The icon */}
          <div style={{ backgroundColor: defaultColor }} className="p-2 rounded-md">
            <Appicon color="#ffffff" height="34" width="34" />
          </div>
          {/* Name of App */}
          <span
            style={{ color: defaultColor }}
            className="font-bold text-customRed"
          >
            Life
          </span>
          <span className="font-light">Score</span>
        </span>
      </div>
    );
}

export default LogoAndName;