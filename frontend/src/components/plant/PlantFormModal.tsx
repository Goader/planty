import {Modal} from "react-bootstrap";
import {FormikHelpers} from "formik";
import PlantForm from "./PlantForm";
import {PlantFormData} from "../../model/plants";

export type PlantModalProps = {
    onHide: () => void,
    onSubmit: (data: PlantFormData, helpers: FormikHelpers<PlantFormData>) => void,
    initialValues: PlantFormData,
    show: boolean,
    title: string,
    allowPhoto: boolean
}

export default function PlantFormModal(props: PlantModalProps) {
    return <Modal show={props.show} size={'lg'} onHide={() => props.onHide()} fullscreen={'sm-down'} centered>
        <Modal.Header closeButton>
            <Modal.Title>
                {props.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <PlantForm onSubmit={props.onSubmit} initialValues={props.initialValues} allowPhoto={props.allowPhoto}/>
        </Modal.Body>
    </Modal>;
}