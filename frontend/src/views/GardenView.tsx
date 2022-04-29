import React, {useEffect, useState} from 'react';
import 'react-calendar/dist/Calendar.css';
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import "./GardenView.css";
import '../components/card/Card.css';
import PlantCard from "../components/card/PlantCard";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";
import {createPlantsGetRequestConfig, mapResponseToPlant} from "../api/plants";
import {Plant, PlantResponse} from "../model/plants";
import {handleUnauthorized} from "../api/auth";


function GardenView() {
    const {request} = useAuth();
    const [fetching, setFetching] = useState(true);
    const [plants, setPlants] = useState<Array<Plant>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        request<Array<PlantResponse>>(createPlantsGetRequestConfig())
            .then(plants => plants.map(plant => mapResponseToPlant(plant)))
            .then(plants => {
                setPlants(plants);
                setFetching(false);
            })
            .catch(err => handleUnauthorized(err, () => navigate('/login')))
            .catch(err => {
                alert('Unexpected error');
                console.log(err);
            });
    }, []);

    return (
        <Container>
            {fetching ? <Spinner animation={'grow'} variant={'success'}/> : <>
                <Row>
                    {plants.map(plant => (<Col xs={12} sm={6} xxl={4} className={'mb-3'} key={plant.id}>
                        <PlantCard plant={plant}/>
                    </Col>))}
                </Row>
                <div>
                    <Link to={'/plants/add'}><Button variant={'primary'}>Add plant</Button></Link>
                </div>
            </>}
        </Container>
    );
}

export default GardenView;