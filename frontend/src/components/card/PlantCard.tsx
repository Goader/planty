import React from "react";
import './PlantCard.scss';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Plant} from "../../model/plants";
import {BsFillTrashFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

function PlantCard({plant, onRemove}: { plant: Plant, onRemove: (id: string) => void }) {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/plants/"+plant.id);
    };
    console.log(plant);
    return (
        <Card className={'py-4 plant-card'}>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Card.Img src={plant.photoUrl ? plant.photoUrl : '/default_plant.png'}/>
                    </Col>
                    <Col xs={12} md={6} className={'d-flex flex-column justify-content-between'}>
                        <div>
                            <div className={"d-flex"}>
                                <Card.Title className={'plant-name flex-grow-1'}>
                                    {plant.name}
                                </Card.Title>
                                <Button onClick={() => {
                                    onRemove(plant.id);
                                }}>
                                    <BsFillTrashFill/>
                                </Button>
                            </div>
                            <Card.Subtitle className={'plant-species'}>{plant.species}</Card.Subtitle>
                        </div>
                        <div>
                            <div className={'info-card mb-3 d-flex justify-content-between px-2 py-1'}>
                                <div className={'text-left'}>
                                    water<br/>
                                    insolation<br/>
                                    fertilize
                                </div>
                                <div className={'text-right'}>
                                    every {plant.watering} days<br/>
                                    {plant.insolation}<br/>
                                    every {plant.fertilizing} days
                                </div>
                            </div>
                            <Button variant="primary" className={'button-card'} onClick={handleNavigate}>Show details</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default PlantCard;