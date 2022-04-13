import React from "react";
import './PlantyNavbar.css'

function PlantyNavbar() {

    return (
        <header>
            <div className={"plantyNavbar"}>
                <a>PLANTY</a>
            </div>
            <div className={"singButton secBut"}>Sing up</div>
            <div className={"singButton"}>Sing in</div>
            <div className={"ghost"}/>
        </header>
    )
}

export default PlantyNavbar;