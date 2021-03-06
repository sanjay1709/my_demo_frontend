import React, { useState } from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EventDelete from "./EventDelete";
import { Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export function EventCard({ eventsView, showEditEventModal }) {
  const [showModal, setShowModal] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);

  const handleEventEdit = (eventsView) => {
    showEditEventModal(eventsView);
  };

  const handleEventDelete = (eventsView) => {
    setDeleteEvent(eventsView);
    setShowModal(true);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 200 }}>
        <CardBody>
          <h4 className="title">{eventsView.name}</h4>
          <p className="date">
            <b>Date:</b>&nbsp;
            {eventsView.date}
          </p>
          <p className="description">{eventsView.description}</p>
          <p className="organizer">
            <b>Organizer:</b>&nbsp;
            {eventsView.organizer}
          </p>
        </CardBody>
        <CardActions disableSpacing>
          <IconButton
            aria-label="edit"
            onClick={() => handleEventEdit(eventsView)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleEventDelete(eventsView)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </CardActions>
      </Card>
      {showModal && (
        <EventDelete
          showModal={showModal}
          setShowModal={setShowModal}
          eventsView={eventsView}
          deleteEvent={deleteEvent}
        />
      )}
    </div>
  );
}
