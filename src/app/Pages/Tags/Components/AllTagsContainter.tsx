import React, { useEffect, useState } from "react";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import { AreaType } from "@/src/app/Types/GlobalTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DropDown from "@/src/app/Dropdown";
import DataFormModel from "@/Model";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid"; 
import addNewArea from "@/src/app/utils/allAreasUtils/addNewArea";
import IconWindow from "../../AllHabits/Components/IconsWindow/IconWindow";

function AllTagsContainer() {
    const {
        allAreasObject: { allAreas, setAllAreas },
        darkModeObject: { isDarkMode },
        openAreaFormObject: { openAreaForm, setOpenAreaForm },
        selectedItemsObject: { selectedItems },
        openIconWindowObject: {setOpenIconWindow, iconSelected, openIconWindow, setIconSelected},
    } = useGlobalContextProvider();

    const [areaItem, setAreaItem] = useState<AreaType>({
        _id: "",
        name: "",
        icon: faCoffee,
    });

    function handleOnClose() {
       setOpenAreaForm(!openAreaForm);
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAreaItem({
            ...areaItem,
            name: event.target.value,
        });
    }

    function handleOnClick() {
        if (!selectedItems) {
            if (areaItem.name.trim() === "") {
                return toast.error("The tag name field is still empty");
            }
            
            const tagExist = allAreas.some((
                (singleTag) =>
                    singleTag.name.toLocaleLowerCase() ===
                    areaItem.name.toLocaleLowerCase()
            ));

            if (tagExist) {
                toast.error("The tag already exists");
                return;
            }

            try {
                addNewArea({ allAreas, setAllAreas, areaItem });
                setOpenAreaForm(false);
            } catch (error) {
                console.log(error);
            }
       }
    }

    useEffect(() => {
        if (!openAreaForm) {
            setAreaItem((prevTagItem) => ({
                ...prevTagItem,
                name: "",
            }));
            return;
        }

        setAreaItem({
            ...areaItem,
            _id: uuidv4(),
        });
    }, [openAreaForm]);

    useEffect(() => {
        setAreaItem({
            ...areaItem,
            icon: iconSelected,
        });
    }, [iconSelected]);
    
    return (
        <div
            style={{
                backgroundColor: isDarkMode
                    ? darkModeColor.background
                    : defaultColor.background,
            }}
            className="w-full mt-5 p-6 flex flex-col gap-6 rounded-md"
        >
            <DropDown />
            <DataFormModel
                isOpen={openAreaForm}
                onClose={handleOnClose}
                FormTitle="Add New Tag"
                textValue={areaItem.name}
                onChange={handleOnChange}
                onClick={handleOnClick}
            />
            <IconWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
                setIconSelected={setIconSelected}
            />
            
            {allAreas.map((singleArea, index) => (
                <div key={index}>
                    <AreaCard singleArea={singleArea} />
                </div>
            ))}
        </div>
    );
}

export default AllTagsContainer;

function AreaCard({ singleArea }: { singleArea: AreaType }) {
    const {
        darkModeObject: { isDarkMode },
        openDropDownObject: { setOpenDropDown, openDropDown },
        dropDownPositionsObject: { setDropDownPositions },
        selectedItemsObject: { setSelectedItems },
    } = useGlobalContextProvider();

    function openTheDropDown(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;
        setDropDownPositions({ top, left });
        setSelectedItems(singleArea);
        setOpenDropDown(true);
    }

    return (
        <div
            style={{
                backgroundColor: isDarkMode
                    ? darkModeColor.backgroundSlate
                    : defaultColor.backgroundSlate,
                color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor,
            }}
            className="flex justify-between p-5 rounded-md"
        >
            <div className="flex items-center gap-4">
                <FontAwesomeIcon
                    className="w-5 h-5 text-customRed"
                    height={20}
                    width={20}
                    icon={singleArea.icon}
                />
                <div className="flex flex-col">
                    <span className="font-semibold">{singleArea.name}</span>
                    <span className="text-gray-400 text-sm">1 Habit</span>
                </div>
            </div>
            <div className="w-10 flex items-center justify-center">
                {singleArea.name !== "All" && (
                    <IconButton onClick={openTheDropDown}>
                        <MoreVertIcon sx={{ color: "gray"}} />
                    </IconButton>
                )}
            </div>
        </div>
    );
}
