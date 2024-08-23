import React from "react";

function HeroSection() {
    return (
        <div className="flex flex-col mx-16 items-center mt-[100px] gap-6">
            <span className="font-bold text-3xl text-center">
                Take Charge of Your <span className="text-customRed">Success!</span>
            </span>
            <p className="text-center text-md sm:w-[430px] w-[370px]">
                Struggling to stick to your goals? Our habit tracker makes it simple to build and maintain the routines that lead to success. Start transforming your life, one habit at a time.
            </p>

            <button
                className={`block text-sm font-light rounded-lg px-9 py-3 text-white transition bg-customRed  focus: outline-none`}
                type="button"
            >
                {`Start Your Journey!`}
            </button>
        </div>
    );
}

export default HeroSection;
