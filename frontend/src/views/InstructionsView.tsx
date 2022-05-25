import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Instruction} from "../model/instructions";

const placeholderInstructions: Instruction[] = [
    {
        id: 'abcd123',
        name: 'Paprotka',
        species: 'Paprotus normalus',
        watering: 3,
        insolation: 'high',
        fertilizing: 5
    },
    {
        id: 'abcd125',
        name: 'Kwiatek',
        species: 'Kwiatus pospolitus',
        watering: 2,
        insolation: 'high',
        fertilizing: 6
    }
];

export default function InstructionsView() {
    const [fetching, setFetching] = useState(true);
    const [instructions, setInstructions] = useState<Instruction[]>(placeholderInstructions);

    useEffect(() => {
        setFetching(false);
    }, []);

    return (
        <Container>
            {fetching ? <Spinner animation={'grow'} variant={'success'}/> : <>
                <Row>
                    {instructions.map(instruction => (
                        <Col xs={12} sm={6} xxl={4} className={'mb-3'} key={instruction.id}>
                            {instruction.name}
                            {/*<InstructionCard instruction={instruction}/>*/}
                        </Col>))}
                </Row>
                <div>
                    <Button variant={'primary'}>Add instruction</Button>
                </div>
            </>}
        </Container>
    );
}