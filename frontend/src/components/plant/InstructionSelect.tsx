import {Instruction} from "../../model/instructions";
import {Col, Row, Spinner} from "react-bootstrap";
import InstructionCard from "../card/InstructionCard";
import React, {useEffect, useState} from "react";
import {useInstructionsService} from "../../api/instructions";
import {UnauthorizedError} from "../../api/auth/util";
import {Link} from "react-router-dom";

type InstructionSelectProps = {
    onSelect: (instruction: Instruction) => void
}

export default function InstructionSelect(props: InstructionSelectProps) {
    const [userInstructions, setUserInstructions] = useState<Instruction[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);
    const {getInstructions} = useInstructionsService();

    useEffect(() => {
        getInstructions()
            .then(instructions => setUserInstructions(instructions))
            .catch(err => {
                if (err instanceof UnauthorizedError) {
                    console.error('InstructionSelect: Unauthorized');
                } else {
                    alert('Unexpected error');
                    console.error('Unexpected error', err);
                }
            })
            .finally(() => setFetching(false));
    }, []);

    return (fetching ? <Spinner animation={'grow'} variant={'success'}/> :
            <Row>
                {userInstructions.length === 0 ?
                    <p>
                        No instructions. <Link to={'/instructions'}>Go to instructions</Link>
                    </p> :
                    userInstructions.map(instruction => (
                        <Col xs={6} sm={6} md={6} lg={4} xl={4} className={'mb-3'} key={instruction.id}>
                            <InstructionCard instruction={instruction}
                                             onButtonClick={() => props.onSelect(instruction)}
                                             buttonText={'Select'}/>
                        </Col>))}
            </Row>
    );
}