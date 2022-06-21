import { Modal } from "react-bootstrap";
import CustomEventForm from "./CustomEventForm";
import { CustomEventFormInfo } from "../../model/calendar";
import { FormikHelpers } from "formik";

export type CustomEventModalProps = {
  onHide: () => void;
  onAdd: (data: CustomEventFormInfo) => void;
  show: boolean;
};

export default function CustomEventModal(props: CustomEventModalProps) {
  return (
    <Modal
      show={props.show}
      size={"lg"}
      onHide={() => props.onHide()}
      fullscreen={"sm-down"}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Custom Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomEventForm onAdd={props.onAdd} />
      </Modal.Body>
    </Modal>
  );
}
