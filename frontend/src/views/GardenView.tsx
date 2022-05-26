import React, {useEffect, useState} from 'react';
import 'react-calendar/dist/Calendar.css';
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import "./GardenView.scss";
import '../components/card/PlantCard.scss';
import PlantCard from "../components/card/PlantCard";
import {Link} from "react-router-dom";
import {Plant} from "../model/plants";
import {UnauthorizedError} from "../api/auth/util";
import {usePlantService} from "../api/plants";
import RemovePlantModal from "../components/RemovePlantModal";


function GardenView() {
    const [fetching, setFetching] = useState(true);
    const [plants, setPlants] = useState<Array<Plant>>([]);
    const {getPlants, deletePlant} = usePlantService();

    const [showDetails, setShowDetails] = useState(false);
    const [chosenId, setChosenId] = useState("");

    const onModalHide = () => {
        setShowDetails(false);
        setChosenId("");
    };

    useEffect(() => {
        getPlants()
            .then(plants => setPlants(plants))
            .catch(err => {
                if (err instanceof UnauthorizedError) {
                    console.error('GardenView: Unauthorized');
                } else {
                    alert('Unexpected error');
                    console.error('Unexpected error', err);
                }
            })
            .finally(() => setFetching(false));
    }, [getPlants]);

    const handleConfirmedRemove = (removeId: any) => {
        setShowDetails(false);
        deletePlant(removeId).then(() => {
            const leftPlants = plants.filter(plant => {
                return plant.id !== removeId;
            });
            setPlants(leftPlants);
        }).catch(err => {
            if (err instanceof UnauthorizedError) {
                console.log('GardenView: Unauthorized');
            } else {
                alert('Unexpected error');
                console.error('Unexpected error', err);
            }
        });
    };

    const handleRemove = (plantId: string) => {
        setShowDetails(true);
        setChosenId(plantId);
    };

    return (
        <Container>
            {fetching ? <Spinner animation={'grow'} variant={'success'}/> : <>
                <Row>
                    {plants.map(plant => (
                        <Col xs={12} sm={6} xxl={4} className={'mb-3'} key={plant.id}>
                            <PlantCard plant={plant} onRemove={handleRemove}/>
                        </Col>
                    ))}
                </Row>
                <div>
                    <Link to={'/plants/add'}><Button variant={'primary'}>Add plant</Button></Link>
                </div>
                <RemovePlantModal onHide={onModalHide}
                                  show={showDetails}
                                  plantId={chosenId}
                                  onDelete={handleConfirmedRemove}
                />
            </>
            }
        </Container>
    );
}

export default GardenView;