import React from "react";
import './PlantyNavbar.css'

function PlantyNavbar() {

    return (
        <header>
            <div className={"plantyNavbar"}>
                <a>PLANTY</a>
            </div>
            <div className={"singButton secBut"}>Sing in</div>
            <div className={"singButton fisBut"}>Sing up</div>



            <div className={"ghost"}/>
        </header>
    )
}

export default PlantyNavbar;