import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {Button, Col, Container, Row} from "react-bootstrap";
import "./GardenView.css";
import '../components/card/Card.css';
import PlantCard, {Plant} from "../components/card/PlantCard";
import {Link} from "react-router-dom";


function GardenView() {

    const imageUrl = "https://picsum.photos/250";

    const plants: Array<Plant> = [
        {
            id: '1',
            image: imageUrl,
            name: "Paprotka1",
            species: "Paprotkus Normalus",
            watering: 3,
            insolation: "very much",
            fertilizing: 5
        },
        {
            id: '2',
            image: imageUrl,
            name: "Paprotka2",
            species: "Paprotkus Normalu2",
            watering: 3,
            insolation: "very much",
            fertilizing: 5
        },
        {
            id: '3',
            image: imageUrl,
            name: "Paprotka3",
            species: "Paprotkus Normalus3",
            watering: 3,
            insolation: "very much",
            fertilizing: 5
        },
        {
            id: '4',
            image: imageUrl,
            name: "Paprotka3",
            species: "Paprotkus Normalus3",
            watering: 3,
            insolation: "very much",
            fertilizing: 5
        },
    ];

    return (
        <Container>
            <Row>
                {plants.map(plant => (<Col xs={12} sm={6} xxl={4} className={'mb-3'}>
                    <PlantCard plant={plant}/>
                </Col>))}
            </Row>
            <div>
                <Link to={'/plants/add'}><Button variant={'primary'}>Add plant</Button></Link>
            </div>
        </Container>
    );
}

export default GardenView;