import {Button, Card, Container} from "react-bootstrap";
import {Plant} from "../model/plants";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {useAuth} from "../api/auth/AuthContext";
import {usePlantService} from "../api/plants";

function PlantDetailsView() {

    const plantId = useParams().plantId;
    const navigate = useNavigate();

    const {request} = useAuth();
    const {getPlant} = usePlantService();

    const [fetching, setFetching] = useState(true);
    const [plant, setPlant] = useState<Plant>();

    useEffect(() => {
        if (plantId != null && plantId !== "") {
            getPlant(String(plantId))
                .then(plant => {
                    setPlant(plant as Plant);
                })
                .catch(err => navigate('/login'))
                .finally(() => setFetching(false));
        } else {
            navigate('/');
        }
    }, [navigate, request]);

    return (
        <Container>
            {plant !== null && plant !== undefined &&
                <Card className={'form-card p-5 mx-auto'}>
                    <div className={'center-header'}>
                        <h1>Plant details:</h1>
                    </div>

                    <div className={'center-header'}>
                        <h5>Name:</h5>
                        <h5>{plant.name}</h5>
                    </div>

                    <div className={'center-header'}>
                        <h5>Picture:</h5>
                        <Card.Img src={plant.photoUrl}/>
                    </div>

                    <div className={'center-header'}>
                        <h5>Species:</h5>
                        <h5>plant.species</h5>
                    </div>

                    <Button type={'submit'} className={'mt-3'}>Choose new care sheet</Button>

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

                    <div className={'center-header'}>
                        <h5>Other info:</h5>
                        <h5>{ plant.otherInfo }</h5>
                    </div>

                    <div className={'center-header'}>
                        <p>Nothing to change? <Link to={"/"}>back to garden</Link></p>
                    </div>

                </Card>}
        </Container>
    );
}

export default PlantDetailsView;