import {Button, Card, Container} from "react-bootstrap";
import React from "react";
import {Instruction} from "../../model/instructions";

export default function InstructionCard({instruction}: { instruction: Instruction }) {
    return (
        <Card className={'py-4 plant-card'}>
            <Container>
                <div className={'d-flex flex-column justify-content-between'}>
                    <div>
                        <Card.Title className={'plant-name'}>{instruction.name}</Card.Title>
                        <Card.Subtitle className={'plant-species'}>{instruction.species}</Card.Subtitle>
                    </div>
                    <div>
                        <div className={'info-card mb-3 d-flex justify-content-between px-2 py-1'}>
                            <div className={'text-left'}>
                                water<br/>
                                insolation<br/>
                                fertilize
                            </div>
                            <div className={'text-right'}>
                                every {instruction.watering} days<br/>
                                {instruction.insolation}<br/>
                                every {instruction.fertilizing} days
                            </div>
                        </div>
                        <Button variant="primary" className={'button-card'}>Update instructions</Button>
                    </div>
                </div>
            </Container>
        </Card>
    );
}