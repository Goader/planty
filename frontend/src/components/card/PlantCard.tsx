import React from "react";
import './Card.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";

export type Plant = {
    id: string,
    name: string,
    image: string,
    species: string,
    watering: number,
    insolation: string,
    fertilizing: number
}

function PlantCard({plant}: { plant: Plant }) {
    return (
        <Card className={'py-4 plant-card'}>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Card.Img src={plant.image}/>
                    </Col>
                    <Col xs={12} md={6} className={'d-flex flex-column justify-content-between'}>
                        <div>
                            <Card.Title className={'plant-name'}>{plant.name}</Card.Title>
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
                            <Button variant="primary" className={'button-card'}>Update instructions</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default PlantCard;