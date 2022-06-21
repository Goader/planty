import {Instruction} from "../../model/instructions";
import {Col, Row, Spinner} from "react-bootstrap";
import InstructionCard from "../card/InstructionCard";
import React, {useEffect, useState} from "react";
import {useInstructionsService} from "../../api/instructions";
import {UnauthorizedError} from "../../api/auth/util";
import {Link} from "react-router-dom";
import SearchPopularInstructionsForm from "./SearchPopularInstructionsForm";

type InstructionSelectProps = {
    onSelect: (instruction: Instruction) => void
    initialSpecies: string
}

export default function InstructionSelect(props: InstructionSelectProps) {
    const [userInstructions, setUserInstructions] = useState<Instruction[]>([]);
    const [popularInstructions, setPopularInstructions] = useState<null | Instruction[]>(null);
    const [fetching, setFetching] = useState<boolean>(true);
    const {getInstructions, getPopularInstructions} = useInstructionsService();

    useEffect(() => {
        let popularInstructionsPromise: Promise<Instruction[] | null> =
            !props.initialSpecies || props.initialSpecies.length === 0
                ? Promise.resolve(null) : getPopularInstructions(props.initialSpecies);
        Promise.all([getInstructions(), popularInstructionsPromise])
            .then(result => {
                const [instructions, searchResult] = result;
                setUserInstructions(instructions);
                setPopularInstructions(searchResult);
            })
            .catch(err => {
                if (err instanceof UnauthorizedError) {
                    console.error('InstructionSelect: Unauthorized');
                } else {
                    alert('Unexpected error');
                    console.error('Unexpected error', err);
                }
            })
            .finally(() => setFetching(false));
    }, [getInstructions, getPopularInstructions, props.initialSpecies]);

    return (fetching ? <Spinner animation={'grow'} variant={'success'}/> : <>
            <h3>Your instructions</h3>
            <Row>
                {userInstructions.length === 0 ?
                    <p>
                        You have not created any instructions. <Link to={'/instructions'}>Go to instructions</Link>
                    </p> :
                    userInstructions.map(instruction => (
                        <Col xs={6} sm={6} md={6} lg={4} xl={4} className={'mb-3'} key={instruction.id}>
                            <InstructionCard instruction={instruction}
                                             onButtonClick={() => props.onSelect(instruction)}
                                             buttonText={'Select'}/>
                        </Col>))}
            </Row>
            <h3>Popular instructions</h3>
            <SearchPopularInstructionsForm onSearch={instructions => setPopularInstructions(instructions)}
                                           initialSpecies={props.initialSpecies}/>
            {popularInstructions !== null && (
                <Row>
                    {popularInstructions.length === 0 ?
                        <p>No popular instructions found.</p> :
                        popularInstructions.map(instruction => (
                            <Col xs={6} sm={6} md={6} lg={4} xl={4} className={'mb-3'} key={instruction.id}>
                                <InstructionCard instruction={instruction}
                                                 onButtonClick={() => props.onSelect(instruction)}
                                                 buttonText={'Select'}/>
                            </Col>))}
                </Row>
            )}
        </>
    );
}