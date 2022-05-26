import {Modal} from "react-bootstrap";

export type AddInstructionProps = {
    onHide: () => void,
    show: boolean
}

export default function AddInstructionModal(props: AddInstructionProps) {
    return <Modal show={props.show} size={'lg'} onHide={props.onHide} fullscreen={'sm-down'} centered>
        <Modal.Header closeButton>
            <Modal.Title>
                Add instruction
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            form
        </Modal.Body>
    </Modal>;
}