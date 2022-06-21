import { Button, Modal } from "react-bootstrap";

export type EventsDetailsProps = {
  onDelete: () => void;
  onHide: () => void;
  show: boolean;
};

function RemovePlantModal(props: EventsDetailsProps) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      fullscreen={"sm-down"}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -0%)",
          }}
        >
          You will delete this plant
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure?</p>
        <Button
          onClick={() => {
            props.onHide();
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            marginLeft: "30px",
            backgroundColor: "#FF0400",
            borderColor: "#FF0400",
          }}
          onClick={() => {
            props.onDelete();
          }}
        >
          Delete
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default RemovePlantModal;
