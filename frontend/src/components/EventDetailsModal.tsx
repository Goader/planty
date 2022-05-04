import {PlantEventDetails} from "../model/calendar";
import {Modal} from "react-bootstrap";
import EventDetailsList from "./EventDetailsList";

export type EventsDetailsProps = {
    events: Array<PlantEventDetails>,
    date: Date,
    onHide: () => void,
    show: boolean
}

function EventDetailsModal(props: EventsDetailsProps) {
    return <Modal show={props.show} size={'lg'} onHide={props.onHide} fullscreen={'sm-down'} centered>
        <Modal.Header closeButton>
            <Modal.Title>
                {props.date.toDateString()} events
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EventDetailsList events={props.events}/>
        </Modal.Body>
    </Modal>;
}

export default EventDetailsModal;