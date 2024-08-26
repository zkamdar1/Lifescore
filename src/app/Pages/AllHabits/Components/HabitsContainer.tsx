import React from "react";
import ContainterTop from "./HabitsContainer/ContainerTop";
import ContainerMiddle from "./HabitsContainer/ContainterMiddle";

function HabitsContainer() {
    return (
        <div
            className="mt-5 bg-white rounded-md p-5 flex flex-col gap-3"
        >
            <ContainterTop />
            <ContainerMiddle />
        </div>  
    );
}

export default HabitsContainer;
