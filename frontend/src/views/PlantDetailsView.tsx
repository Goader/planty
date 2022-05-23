import {Container} from "react-bootstrap";
import {Plant} from "../model/plants";
import {useAuth} from "../components/AuthContext";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createSinglePlantsGetRequest} from "../api/plants";
import {handleUnauthorized} from "../api/auth";

function PlantDetailsView() {

    const plantId = useParams().plantId;
    const navigate = useNavigate();

    const {request} = useAuth();
    const [fetching, setFetching] = useState(true);
    const [plant, setPlant] = useState<Plant>();

    useEffect(() => {
        if (plantId != null && plantId !== "") {
            request(createSinglePlantsGetRequest(plantId))
                .then(plant => {
                    setPlant(plant as Plant);
                })
                .catch(err => handleUnauthorized(err, () => navigate('/login')))
                .catch(err => {
                    alert('Unexpected error');
                    console.log(err);
                })
                .finally(() => setFetching(false));
        } else {
            navigate('/');
        }
    }, [navigate, request]);

    return (<Container>
        {plant && <div>
            {plant.id}
            {plant.name}
        </div>}
        elo
    </Container>);
}

export default PlantDetailsView;