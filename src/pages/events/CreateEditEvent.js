import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_EVENT, ADD_EVENT } from "../../graphql/mutation/events";
import { toast } from "react-toastify";
import { EVENTS_DATA } from "../../graphql/query/events";
import Button from "@mui/material/Button";
import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Col,
  Form,
  Input,
  Label,
} from "reactstrap";

function CreateEditEvent({ closeCreateEdit, editDatas, editMode }) {
  const [eventFields, setAddEventField] = useState([
    { name: "", date: "", description: "", organizer: "" },
  ]);
  const [errors, setErrors] = useState();
  const handleCancel = () => {
    closeCreateEdit();
  };

  const setDateValue = (Date) => {
    const values = [...eventFields];
    values[0]["date"] = moment(Date).format("YYYY/MM/DD");
    setAddEventField(values);
  };

  const handleInputChange = (event) => {
    const values = [...eventFields];
    values[0][event.target.name] = event.target.value;
    setAddEventField(values);
  };

  const handleSubmit = (eventsView) => {
    if (editMode) {
      //Code for events Update
      updateEvent({
        variables: {
          eventId: editDatas.id,
          event: eventFields[0],
        },
      });
    } else {
      //Code for new event
      saveEvent({
        variables: {
          event: eventFields[0],
        },
      });
    }
  };

  //Mutation for add event
  const [saveEvent] = useMutation(ADD_EVENT, {
    refetchQueries: [
      {
        query: EVENTS_DATA,
        variables: { offset: 0, limit: 10, search: null },
      },
    ],
    onCompleted: (data) => {
      if (data.addEvent.status === false) {
        setErrors(data.addEvent.msg);
      } else {
        closeCreateEdit();
      }
    },
    onError: (error) => {
      toast.error("Error: " + error.message);
    },
  });

  //initialize values for Save and Update
  useEffect(() => {
    if (editMode) {
      const values = [{ name: "", date: "", description: "", organizer: "" }];
      values[0]["name"] = editDatas.name;
      values[0]["date"] = editDatas.date;
      values[0]["description"] = editDatas.description;
      values[0]["organizer"] = editDatas.organizer;
      setAddEventField(values);
    }
  }, [editMode, editDatas]);

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    refetchQueries: [
      {
        query: EVENTS_DATA,
      },
    ],
    onCompleted: (data) => {
      if (data.updateEvent.status === false) {
        setErrors(data.updateEvent.msg);
      } else {
        closeCreateEdit();
        toast.success("Event Updated");
      }
    },
    onError: (error) => {
      toast.error("Event not updated -" + error.message);
    },
  });

  return (
    <Row>
      <Col className="pr-1" md="12">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">Edit Event</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Event Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={eventFields[0].name}
                      onChange={(event) => handleInputChange(event)}
                    />
                    <Label>
                      {errors && errors.name ? errors.name.message : null}
                    </Label>
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>Date</label>
                    <DatePickerInput
                      onChange={(event) => setDateValue(event)}
                      value={eventFields[0].date}
                      className="my-custom-datepicker-component"
                    />
                    <Label>
                      {errors && errors.date ? errors.date.message : null}
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Organizer</label>
                    <Input
                      value={eventFields[0].organizer}
                      name="organizer"
                      onChange={(event) => handleInputChange(event)}
                    />
                    <Label>
                      {errors && errors.organizer
                        ? errors.organizer.message
                        : null}
                    </Label>
                  </FormGroup>
                </Col>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>Description</label>
                    <Input
                      value={eventFields[0].description}
                      name="description"
                      onChange={(event) => handleInputChange(event)}
                    />
                    <Label>
                      {errors && errors.description
                        ? errors.description.message
                        : null}
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <div className="update ml-auto mr-auto">
                  <Button
                    className="btn-round"
                    color="primary"
                    type="submit"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn-round"
                    color="primary"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </div>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateEditEvent;
