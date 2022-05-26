import {Button, Modal} from "react-bootstrap";

export type EventsDetailsProps = {
    onDelete: (plantId: string) => void,
    plantId: string,
    onHide: () => void,
    show: boolean
}

function RemovePlantModal(props: EventsDetailsProps) {
    return <Modal show={props.show} size={'lg'} onHide={props.onHide} fullscreen={'sm-down'} centered>
        <Modal.Header closeButton>
            <Modal.Title>
                You will delete this plant
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure?</p>
            <Button onClick={
                () => {
                    props.onHide();
                }
            }
            >Cancel</Button>
            <Button onClick={
                () => {
                    props.onDelete(props.plantId);
                }
            }>Delete</Button>
        </Modal.Body>
    </Modal>;
}

export default RemovePlantModal;