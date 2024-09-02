import Button from "./Button";
import { darkModeColor, defaultColor } from "./colors";
import InputName from "./InputName";
import { useGlobalContextProvider } from "./src/app/contextApi";

interface DataFormModelProps {
    isOpen: boolean;
    FormTitle: string;
    className?: string;
    textValue?: string;
    onClose: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
}

export default function DataFormModel({
    FormTitle,
    className = "",
    isOpen,
    textValue,
    onClose,
    onChange,
    onClick,
}: DataFormModelProps) {
    const defaultClassses = `top-[6%] left-1/2 tranform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md absolute`;

    const {
        darkModeObject: { isDarkMode },
    } = useGlobalContextProvider();

    return (
        <>
            {isOpen && (
                <div
                   style={{
                        backgroundColor: isDarkMode
                            ? darkModeColor.background
                            : defaultColor.background,
                        color: isDarkMode
                            ? darkModeColor.textColor
                            : defaultColor.textColor,
                    }}
                    className={`${defaultClassses} ${className}`}
                >
                    <Header FormTitle={FormTitle} onClose={onClose} />
                    <div className="w-full">
                        <InputName
                            inputlabel="Tag Name"
                            placeholder="Type a name for the tag... "
                            onChange={onChange}
                            value={textValue}
                        />
                    </div>

                    <Button
                        onClick={onClick}
                        className="bg-customRed text-white mt-10 p-3 px-6"
                    >
                        {FormTitle === "Add New Tag" ? "Add New Tag" : "Edit Tag"}
                    </Button>
                </div>
            )}
        </>
    );
}

function Header({
    FormTitle,
    onClose,
}: {
    FormTitle: string;
    onClose: () => void;
}) {
    return (
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">{FormTitle}</span>
        <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 011.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
            />
          </svg>
        </button>
      </div>
    );
}
