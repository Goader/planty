import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {Card, Container} from "react-bootstrap";
import "./GardenView.css";
import PlantCard from "../components/card/PlantCard";


function GardenView() {

    const imageUrl = "https://picsum.photos/250";

    const plants = [
        {
            image: imageUrl,
            name: "Paprotka1",
            species: "Paprotkus Normalus",
            water: "every 3 days",
            sun: "very much",
            replant: "every winter"
        },
        {
            image: imageUrl,
            name: "Paprotka2",
            species: "Paprotkus Normalu2",
            water: "every 3 days2",
            sun: "very much2",
            replant: "every winter2"
        },
        {
            image: imageUrl,
            name: "Paprotka3",
            species: "Paprotkus Normalus3",
            water: "every 3 days3",
            sun: "very much3",
            replant: "every winter3"
        },
        {
            image: imageUrl,
            name: "Paprotka3",
            species: "Paprotkus Normalus3",
            water: "every 3 days3",
            sun: "very much3",
            replant: "every winter3"
        },
    ];

    var result = plants.map( plant => {
        return (<div className={'col-sm-6 col-md-6 col-lg-4'}>
            <PlantCard obj={plant}/>
        </div>);
    });

    return (
        <Container>
            <div className={'container'}>
                <div className={'row'}>
                    {result}
                </div>
            </div>
        </Container>
    );
}

export default GardenView;