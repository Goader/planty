import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Instruction} from "../model/instructions";
import InstructionCard from "../components/card/InstructionCard";
import AddInstructionModal from "../components/AddInstructionModal";

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
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setFetching(false);
    }, []);

    return (
        <Container>
            {fetching ? <Spinner animation={'grow'} variant={'success'}/> : <>
                <Row>
                    {instructions.map(instruction => (
                        <Col xs={12} sm={6} md={4} xl={3} className={'mb-3'} key={instruction.id}>
                            <InstructionCard instruction={instruction}/>
                        </Col>))}
                </Row>
                <div>
                    <Button variant={'primary'} onClick={() => setModalVisible(true)}>Add instruction</Button>
                </div>
            </>}
            <AddInstructionModal onHide={() => setModalVisible(false)} show={modalVisible}/>
        </Container>
    );
}