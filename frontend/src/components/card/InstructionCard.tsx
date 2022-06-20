import {Button, Card, Container} from "react-bootstrap";
import React from "react";
import {Instruction} from "../../model/instructions";

type InstructionCardProps = {
    instruction: Instruction,
    onButtonClick: () => void,
    buttonText: string
}

export default function InstructionCard(props: InstructionCardProps) {
    return (
        <Card className={'py-4 plant-card'}>
            <Container>
                <div className={'d-flex flex-column justify-content-between'}>
                    <div>
                        <Card.Title className={'plant-name'}>{props.instruction.name}</Card.Title>
                        <Card.Subtitle className={'plant-species'}>{props.instruction.species}</Card.Subtitle>
                    </div>
                    <div>
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
                        <Button variant="primary" className={'button-card'} onClick={props.onButtonClick}>
                            {props.buttonText}
                        </Button>
                    </div>
                </div>
            </Container>
        </Card>
    );
}