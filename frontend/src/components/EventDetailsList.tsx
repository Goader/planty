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
        default:
            return null;
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
    let event = props.event;
    return <ListGroup.Item className={'d-flex justify-content-between'}
                           variant={getItemVariant(event.daysLate)}>
        <p className={'m-0'}>{event.plant.name} {event.customInfo !== null && event.customInfo.name}</p>
        {event.daysLate > 0 &&
            <p className={'m-0'}>{event.daysLate} {getInterval(event.action)} overdue</p>}
    </ListGroup.Item>;
}

type EventDetailsListProps = {
    events: PlantEventDetails[]
}

type EventSubListProps = EventDetailsListProps & {
    title: string
    alt: string
}

function EventSubList(props: EventSubListProps) {
    return (<>
        <h5>{props.title}</h5>
        {props.events.length === 0 ? <p>{props.alt}</p> :
            <ListGroup className={'mb-3'}>
                {props.events.map(event => <EventListItem event={event} key={event.plant.id}/>)}
            </ListGroup>
        }
    </>);
}


function EventDetailsList(props: EventDetailsListProps) {
    const events = {
        water: new Array<PlantEventDetails>(),
        insolation: new Array<PlantEventDetails>(),
        fertilize: new Array<PlantEventDetails>(),
        custom: new Array<PlantEventDetails>()
    };
    props.events.forEach(event => {
        events[event.action].push(event);
    });

    return (<>
        <EventSubList events={events.water} title={'Water'} alt={'No plants to water'}/>
        {/*<EventSubList events={events.insolation} title={'Insolate'} alt={'No plants to insolate'}/>*/}
        <EventSubList events={events.fertilize} title={'Fertilize'} alt={'No plants to fertilize'}/>
        <EventSubList events={events.custom} title={'Custom events'} alt={'No custom events'}/>
    </>);
}

export default EventDetailsList;