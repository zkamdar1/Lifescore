interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    color?: "Gray" | "Yellow" | "Red" | "Orange";
    size?: "small" | "medium" | "large";
    icon?:
      | "plus"
      | "minus"
      | "check"
      | "close"
      | "menu"
      | "search"
      | "home"
      | "settings"
      | "user";
}

export default function Button({
    className = "",
    onClick,
    size = "medium",
    children,
    color = "Gray",
    icon,
    ...rest
}: ButtonProps) {
    let colorClass = "";
    let sizeClass = "";
    let defaultClass = 
        " flex items-center justify-center gap-2 p-3 rounded-md w-full";
    
    switch (color) {
        case "Yellow":
            colorClass = 'bg-yellow-500';
            break;
        case "Red":
            colorClass = 'bg-red-500';
            break;
        case "Gray":
            colorClass = 'bg-gray-500';
            break;
        case "Orange":
            colorClass = 'bg-orange-500';
            break;
        default:
            colorClass = "bg-slate-300";
            break;
    }
    
    switch (size) {
        case "small":
            sizeClass = "px-2 py-1 text-sm";
            break;
        case "medium":
            sizeClass = "p-4 text-base";
            break;
        case "large":
            sizeClass = "px-6 py-3 text-lg";
            break;
        default:
            sizeClass = "px-4 py-2 text-base";
            break;
    }

    let iconComponent: React.ReactNode = null;

    const PlusIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
        >
            <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
                clipRule="evenodd"
            />
        </svg>
    );

    const HomeIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10 3.172L3.172 10H4v7a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1v-7h.828L10 3.172z"
          clipRule="evenodd"
        />
      </svg>
    );

    const MinusIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    );

    const CheckIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );

    const CloseIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 011.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );

    const MenuIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
          clipRule="evenodd"
        />
      </svg>
    );

    const SearchIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zm8 10a1 1 0 00-1.707-.707l-3.586 3.586a1 1 0 101.414 1.414l3.586-3.586A1 1 0 0016 14z"
          clipRule="evenodd"
        />
      </svg>
    );

    const SettingsIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 018 8v2a1 1 0 01-.293.707l-1 1a1 1 0 010 1.414l.293.293A1 1 0 0118 16a1 1 0 01-1 1H3a1 1 0 01-1-1 1 1 0 01.293-.707l.293-.293a1 1 0 010-1.414l-1-1A1 1 0 012 12V10a8 8 0 018-8z"
          clipRule="evenodd"
        />
      </svg>
    );

    const UserIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 018 8v1.707l-2.293-2.293A8.001 8.001 0 0010 2zM10 12a6 6 0 00-4.7 2.3A6.001 6.001 0 0110 18a6 6 0 014.7-2.3A6.001 6.001 0 0010 12z"
          clipRule="evenodd"
        />
      </svg>
    );

    switch (icon) {
      case "plus":
        iconComponent = <PlusIcon />;
        break;
      case "minus":
        iconComponent = <MinusIcon />;
        break;
      case "check":
        iconComponent = <CheckIcon />;
        break;
      case "close":
        iconComponent = <CloseIcon />;
        break;
      case "menu":
        iconComponent = <MenuIcon />;
        break;
      case "search":
        iconComponent = <SearchIcon />;
        break;
      case "home":
        iconComponent = <HomeIcon />;
        break;
      case "settings":
        iconComponent = <SettingsIcon />;
        break;
      case "user":
        iconComponent = <UserIcon />;
        break;
      default:
        iconComponent = null;
        break;
    }

    return (
      <button
        onClick={onClick}
        className={`${defaultClass} ${colorClass} ${sizeClass} ${className}`}
        {...rest}
      >
        {iconComponent}
        {children}
      </button>
    );
}
