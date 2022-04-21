import React from 'react';
import 'react-calendar/dist/Calendar.css';
import './SwitchComponent.css'

function SwitchComponent() {

    return (
        <div className={"switchCom"}>
            <div className={"backForSwitches"}>
                <div className={"switch"}>Your garden</div>
                <div className={"switch active"}>Your calendar</div>
            </div>
        </div>
    )
}

export default SwitchComponent;