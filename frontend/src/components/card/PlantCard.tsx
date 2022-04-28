import React from "react";
import './Card.css';
import {Button, Card} from "react-bootstrap";

function PlantCard(props: any) {

    const data = props.obj;

    return (
        <Card style={{ width: '100%' }} className={'card-style row no-gutters'}>
            <div className={'row no-gutters'}>
                <div className={'col-md-6'}>
                    <Card.Img className={'card-layout'} src={data.image} />
                </div>
                <div className={'col-md-6'}>
                    <Card.Body className={'card-layout'}>
                        <Card.Title className={'plant-name-card'}>{data.name}</Card.Title>
                        <Card.Subtitle className={'plant-species-card'}>{data.species}</Card.Subtitle>
                        <div className={'info-card'}>
                            <div className={'left'} style={{width: '30%'}}>
                                water:<br/>
                                sun:<br/>
                                replant:
                            </div>
                            <div className={'left text-right'}>
                                {data.water} <br/>
                                {data.sun} <br/>
                                {data.replant}
                            </div>
                        </div>
                        <Button variant="primary" className={'button-card'}>Update instructions</Button>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
}

export default PlantCard;