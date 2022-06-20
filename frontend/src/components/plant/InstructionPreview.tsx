import {Instruction} from "../../model/instructions";
import React from "react";

export default function InstructionPreview(props: { instruction: Instruction }) {
    return (
        <div className={'info-card mb-3 d-flex justify-content-between px-2 py-1'}>
            <div className={'text-left'}>
                water<br/>
                insolation<br/>
                fertilize
            </div>
            <div className={'text-right'}>
                every {props.instruction.watering} days<br/>
                {props.instruction.insolation}<br/>
                every {props.instruction.fertilizing} days
            </div>
        </div>
    );
}