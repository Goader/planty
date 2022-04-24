import {PlantEvent} from "../model/calendar";
import {Badge} from "react-bootstrap";
import {Variant} from "react-bootstrap/types";

type CalendarPlantInfoProps = {
    name: string,
    events: Array<PlantEvent>
}

export default function CalendarPlantInfo(props: CalendarPlantInfoProps) {
    let maxPriority = Math.max(...props.events.map(event => event.priority));
    let variant: Variant;
    switch (maxPriority) {
        case 0:
            variant = 'success';
            break;
        case 1:
            variant = 'secondary';
            break;
        case 2:
            variant = 'warning';
            break;
        default:
            variant = 'danger';
    }

    return (<Badge bg={variant}>{props.name}</Badge>);
}