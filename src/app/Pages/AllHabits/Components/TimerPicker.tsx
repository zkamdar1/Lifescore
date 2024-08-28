import { useGlobalContextProvider } from "@/src/app/contextApi";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultColor, darkModeColor } from "@/colors";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type TimeValue = {
    text: string;
    isSelected: boolean;
};

function TimerPicker({
    onSaveTime,
}: {
    onSaveTime: (timeValue: string) => void;
}) {
    const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { openTimePickerWindow, setOpenTimePickerWindow } = openTimePickerObject;
    const [timeValue, setTimeValue] = useState([
      { text: "06", isSelected: true },
      { text: "30", isSelected: false },
    ]);
    const [meridiem, setMeridiem] = useState([
      { text: "AM", isSelected: true },
      { text: "PM", isSelected: false },
    ]);
    const hoursRef = useRef<HTMLInputElement>(null);
    const minutesRef = useRef<HTMLInputElement>(null);

    function updateMeridiemFx(clickedIndex: number) {
        const updateMeridiem = meridiem.map((singleMeridiem, index) => {
            if (index === clickedIndex) {
                return { ...singleMeridiem, isSelected: true };
            }

            return { ...singleMeridiem, isSelected: false };
        });

        setMeridiem(updateMeridiem);
    }

    function updateTimeValues(clickedIndex: number) {
      const updateTimeValues = timeValue.map((singleTimeValue, index) => {
        if (index === clickedIndex) {
          return { ...singleTimeValue, isSelected: true };
        }

        return { ...singleTimeValue, isSelected: false };
      });

      setTimeValue(updateTimeValues);
    }

    function updateTimeValuesText(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const timesValueCopy = [...timeValue];
        const currentText = event.target.value;
        const parsedValue = parseInt(currentText, 10);

        const isNumeric = /^\d*$/.test(currentText);

        if (index === 0) {
          // Handling Hours (1-12)
          if (
            (isNumeric &&
              currentText.length <= 2 &&
              parsedValue >= 0 &&
              parsedValue <= 12) ||
            currentText === ""
          ) {
            timesValueCopy[index].text = currentText;
            setTimeValue(timesValueCopy);
          }
        } else if (index === 1) {
          // Handling Minutes (0-59)
          if (
            (isNumeric &&
              currentText.length <= 2 &&
              parsedValue >= 0 &&
              parsedValue <= 59) ||
            currentText === ""
          ) {
            timesValueCopy[index].text = currentText;
            setTimeValue(timesValueCopy);
          }
        }
    }

    function handleOnBlur(index: number) {
      const timesValueCopy = [...timeValue];
      const currentText = timesValueCopy[index].text;

      if (index === 0) {
        // For hours
        if (currentText === "" || currentText === "00") {
          // Set hours to "01" if empty or "00"
          timesValueCopy[index].text = "01";
        } else if (currentText.length === 1) {
          // Pad single digits with a leading zero
          timesValueCopy[index].text = "0" + currentText;
        }
      } else if (index === 1) {
        // For minutes
        if (currentText === "") {
          // Set minutes to "00" if empty
          timesValueCopy[index].text = "00";
        } else if (currentText.length === 1) {
          // Pad single digits with a leading zero
          timesValueCopy[index].text = "0" + currentText;
        }
      }

      setTimeValue(timesValueCopy);
    }

    function saveTime() {
      const meridiemSelected = meridiem.filter(
        (singleMeridiem) => singleMeridiem.isSelected
      )[0].text;

      const selectedTimeFormatted =
        timeValue[0].text + ":" + timeValue[1].text + " " + meridiemSelected;

      onSaveTime(selectedTimeFormatted);
      setOpenTimePickerWindow(false);
    }

    useEffect(() => {
        if (openTimePickerWindow) {
            if (timeValue[0].isSelected) {
                hoursRef.current?.focus();
            } else if (timeValue[1].isSelected) {
                minutesRef.current?.focus();
            }
        }
    }, [openTimePickerWindow]);

    return (
        <div
            className={`bg-white w-[413px] top-[89px] left-1/2 transform -translate-x-1/2 z-50 p-7 rounded-md shadow-md ${
                openTimePickerWindow ? "absolute" : "hidden"
            }`}
        >
            {/* Select time + closing icon */}
            <span className="font-bold flex justify-between items-center"
            >
                {/* Select Time */}
                <span>Select Time</span>

                {/* Closing Icon */}
                <FontAwesomeIcon
                    height={20}
                    width={20}
                    className={`top-8 right-4 text-gray-300 cursor-pointer`}
                    onClick={() => setOpenTimePickerWindow(false)}
                    icon={faClose}
                />
            </span>
            {/* ------------------------ */}
            {/* Input Fields */}
            <div className="flex gap-8 mt-9">
                <div className="flex gap-2 justify-center items-center">
                    {/* Hours Field */}
                    <input
                        value={timeValue[0].text}
                        onClick={() => {
                            updateTimeValues(0);
                        }}
                        ref={hoursRef}
                        onChange={(event) => updateTimeValuesText(event, 0)}
                        onBlur={() => handleOnBlur(0)}
                        readOnly={!timeValue[0].isSelected}
                        style={{
                            backgroundColor: timeValue[0].isSelected
                                ? defaultColor[100]
                                : defaultColor.backgroundSlate,
                            color: timeValue[0].isSelected
                                ? defaultColor.default
                                : defaultColor.textColorGray
                        }}
                        className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
                    />

                    <span className="text-2x font-bold">:</span>

                    {/* Minutes Field */}
                    <input
                        value={timeValue[1].text}
                        onClick={() => {
                            updateTimeValues(1);
                        }}
                        ref={minutesRef}
                        onChange={(event) => updateTimeValuesText(event, 1)}
                        onBlur={() => handleOnBlur(1)}
                        readOnly={!timeValue[1].isSelected}
                        style={{
                            backgroundColor: timeValue[1].isSelected
                                ? defaultColor[100]
                                : defaultColor.backgroundSlate,
                            color: timeValue[1].isSelected
                                ? defaultColor.default
                                : defaultColor.textColorGray
                        }}
                        className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
                    />
                </div>
                {/* ------------------------ */}
                {/* AM or PM Options */}
                <div className="flex flex-col gap-3">
                    {meridiem.map((singleMeridiem, index) => (
                        <span
                            key={index}
                            onClick={() => updateMeridiemFx(index)}
                            style={{
                                backgroundColor: singleMeridiem.isSelected
                                    ? defaultColor[100]
                                    : defaultColor.backgroundSlate,
                                color: singleMeridiem.isSelected
                                    ? defaultColor.default
                                    : defaultColor.textColorGray
                            }}
                            className="text-xl flex justify-center items-center w-[104px] h-[45px] rounded-md cursor-pointer select-none"
                        >
                            {singleMeridiem.text}
                        </span>
                    ))}
                </div>
            </div>
            {/* Save Button */}
            <button
                className="bg-customRed p-3 text-white w-full rounded-md mt-10 mb-1"
                onClick={() => saveTime()}
            >
                Save
            </button>
        </div>
    );
}

export default TimerPicker;
