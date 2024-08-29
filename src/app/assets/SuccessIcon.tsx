export function SuccessIcon({ color = "#000000" }: { color: string }) {
    return (
      <svg
        fill={color}
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M960 0c170.654 0 339.05 46.08 487.115 133.158l-57.26 97.355C1259.067 153.6 1110.437 112.94 960 112.94c-467.125 0-847.059 379.934-847.059 847.059 0 467.125 379.934 847.059 847.059 847.059 467.125 0 847.059-379.934 847.059-847.059 0-150.55-40.659-299.181-117.572-429.967l97.242-57.148C1873.92 620.95 1920 789.345 1920 960c0 529.355-430.645 960-960 960S0 1489.355 0 960 430.645 0 960 0Zm0 338.824v112.94c-280.207 0-508.235 228.029-508.235 508.236S679.793 1468.235 960 1468.235 1468.235 1240.207 1468.235 960h112.941c0 342.55-278.738 621.176-621.176 621.176-342.438 0-621.176-278.625-621.176-621.176 0-342.55 278.738-621.176 621.176-621.176Zm0 338.823v112.941c-93.402 0-169.412 76.01-169.412 169.412s76.01 169.412 169.412 169.412 169.412-76.01 169.412-169.412h112.94c0 155.633-126.606 282.353-282.352 282.353-155.746 0-282.353-126.72-282.353-282.353S804.254 677.647 960 677.647Zm863.413-661.18 79.962 79.85-581.23 581.33h259.031v112.941h-451.764V338.824h112.94v258.905l581.06-581.262Z"
            fill-rule="evenodd"
          ></path>{" "}
        </g>
      </svg>
    );
}