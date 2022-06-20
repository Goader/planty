import {Modal} from "react-bootstrap";
import InstructionForm from "./InstructionForm";
import {BaseInstruction} from "../../model/instructions";
import {FormikHelpers} from "formik";

export type InstructionModalProps = {
    onHide: () => void,
    onSubmit: (data: BaseInstruction, helpers: FormikHelpers<BaseInstruction>) => void,
    initialValues: BaseInstruction,
    show: boolean,
    title: string
}

export default function InstructionFormModal(props: InstructionModalProps) {
    return <Modal show={props.show} size={'lg'} onHide={() => props.onHide()} fullscreen={'sm-down'} centered>
        <Modal.Header closeButton>
            <Modal.Title>
                {props.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InstructionForm onSubmit={props.onSubmit} initialValues={props.initialValues}/>
        </Modal.Body>
    </Modal>;
}