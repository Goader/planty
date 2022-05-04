import {ListGroup} from "react-bootstrap";
import {Action, PlantEventDetails} from "../model/calendar";
import {Variant} from "react-bootstrap/types";


function getInterval(action: Action) {
    switch (action) {
        case "fertilize":
            return "weeks";
        case "insolation":
            return "months";
        case "water":
            return "days";
    }
}

function getItemVariant(eventPriority: number): Variant | undefined {
    switch (eventPriority) {
        case 0:
            return undefined;
        case 1:
            return 'warning';
        default:
            return 'danger';
    }
}

type EventListItemProps = {
    event: PlantEventDetails
}

function EventListItem(props: EventListItemProps) {
    return <ListGroup.Item className={'d-flex justify-content-between'}
                           variant={getItemVariant(props.event.priority)}>
        <p className={'m-0'}>{props.event.plantDetails.name}</p>
        {props.event.priority > 0 &&
            <p className={'m-0'}>{props.event.priority} {getInterval(props.event.action)} overdue</p>}
    </ListGroup.Item>;
}

type EventDetailsListProps = {
    events: PlantEventDetails[]
}

function EventDetailsList(props: EventDetailsListProps) {
    const events = {
        water: new Array<PlantEventDetails>(),
        insolation: new Array<PlantEventDetails>(),
        fertilize: new Array<PlantEventDetails>()
    };
    props.events.forEach(event => {
        events[event.action].push(event);
    });

    return (<>
        <h5>Water</h5>
        {events.water.length === 0 ? <p>No plants to water</p> :
            <ListGroup className={'mb-3'}>
                {events.water.map(event => <EventListItem event={event}/>)}
            </ListGroup>
        }
        <h5>Insolate</h5>
        {events.insolation.length === 0 ? <p>No plants to insolate</p> :
            <ListGroup className={'mb-3'}>
                {events.insolation.map(event => <EventListItem event={event}/>)}
            </ListGroup>
        }
        <h5>Fertilize</h5>
        {events.fertilize.length === 0 ? <p>No plants to fertilize</p> :
            <ListGroup>
                {events.fertilize.map(event => <EventListItem event={event}/>)}
            </ListGroup>
        }
    </>);
}

export default EventDetailsList;