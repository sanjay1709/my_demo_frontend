import { Modal, ModalFooter, ModalBody, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { EVENTS_DATA } from "../../graphql/query/events";
import { DELETE_EVENT } from "../../graphql/mutation/events";

const EventDelete = ({ setShowModal, showModal, eventsView, deleteEvent }) => {
  const [deletedEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [
      {
        query: EVENTS_DATA,
        variables: { offset: 0, limit: 10, search: null },
      },
    ],
    onCompleted: (data) => {
      toast.success("Event deleted");
    },
    onError: (error) => {
      toast.error("Error : " + error.message);
    },
  });
  console.log(eventsView.id);
  const handleDelete = () => {
    deletedEvent({
      variables: {
        eventId: parseInt(deleteEvent.id),
      },
    });
    setShowModal(false);
  };
  console.log(eventsView);
  return (
    <>
      <Modal isOpen={showModal} className="modal-dialog-centered modal-md">
        <ModalBody>
          <div className="row">
            <div className="col-2">
              <i className="fas fa-trash delete-icon"></i>
            </div>
            <div className="col-10 mt-1">
              <h3>Delete Event</h3>
            </div>
          </div>
          <Label>Are you sure you want to delete this event?</Label>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm  mr-custom"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default EventDelete;
