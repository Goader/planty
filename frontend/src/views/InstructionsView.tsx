import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Instruction} from "../model/instructions";
import InstructionCard from "../components/card/InstructionCard";
import AddInstructionModal from "../components/instruction/AddInstructionModal";
import {useInstructionsService} from "../api/instructions";
import {UnauthorizedError} from "../api/auth/util";
import EditInstructionModal from "../components/instruction/EditInstructionModal";

export default function InstructionsView() {
    const [fetching, setFetching] = useState(true);
    const [instructions, setInstructions] = useState<Instruction[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editedInstruction, setEditedInstruction] = useState<Instruction | null>(null);
    const {getInstructions} = useInstructionsService();

    useEffect(() => {
        getInstructions()
            .then(instructions => setInstructions(instructions))
            .catch(err => {
                if (err instanceof UnauthorizedError) {
                    console.error('GardenView: Unauthorized');
                } else {
                    alert('Unexpected error');
                    console.error('Unexpected error', err);
                }
            })
            .finally(() => setFetching(false));
    }, [getInstructions]);

    const handleCreatedInstruction = (instruction: Instruction) => {
        setInstructions([...instructions, instruction]);
        setModalVisible(false);
    };

    const handleUpdatedInstruction = (updatedInstruction: Instruction) => {
        let newInstructions = [...instructions];
        let instructionIndex = null;
        newInstructions.forEach((instruction, index) => {
            if (instruction.id === updatedInstruction.id) {
                instructionIndex = index;
            }
        });
        if (instructionIndex === null) {
            console.error(`Instruction with id ${updatedInstruction.id} no longer exists.`);
        } else {
            newInstructions[instructionIndex] = updatedInstruction;
            setInstructions(newInstructions);
        }
        setEditedInstruction(null);
    };

    return (
        <Container>
            {fetching ? <Spinner animation={'grow'} variant={'success'}/> : <>
                <Row>
                    {instructions.map(instruction => (
                        <Col xs={12} sm={6} md={4} xl={3} className={'mb-3'} key={instruction.id}>
                            <InstructionCard instruction={instruction}
                                             onButtonClick={() => setEditedInstruction(instruction)}
                                             buttonText={'Edit'}/>
                        </Col>))}
                </Row>
                <div>
                    <Button variant={'primary'} onClick={() => setModalVisible(true)}>Add instruction</Button>
                </div>
            </>}
            <AddInstructionModal onAdd={handleCreatedInstruction}
                                 onHide={() => setModalVisible(false)}
                                 show={modalVisible}/>
            <EditInstructionModal onHide={() => setEditedInstruction(null)}
                                  onEdit={handleUpdatedInstruction}
                                  instruction={editedInstruction}/>
        </Container>
    );
}