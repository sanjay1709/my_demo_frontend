import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { EVENTS_DATA } from "../../graphql/query/events";
import { useQuery } from "@apollo/client";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { EventCard } from "./EventCard";
import CreateEditEvent from "./CreateEditEvent";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Events() {
  const [eventDatas, setEventDatas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [editDatas, setEditDatas] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState(null);

  //events fetch query
  const {
    data: result,
    loading,
    error,
  } = useQuery(EVENTS_DATA, {
    variables: { offset: 0, limit: 10, search: search },
  });

  const closeCreateEdit = () => {
    setEditEventModal(false);
    setEditMode(false);
  };

  const showEditEventModal = (eventsView) => {
    setEditDatas(eventsView);
    setEditMode(true);
    setEditEventModal(true);
  };

  useEffect(() => {
    if (loading === false) {
      if (error) {
        if (error.message === "Non authenticated") {
          Swal.fire({
            title: "<strong>Your session is expired!</strong>",
            icon: "info",
            focusConfirm: false,
            confirmButtonText: "Logout!",
          }).then(function () {
            localStorage.clear();
            window.location.href = "/";
          });
        } else {
          toast.error("Error : " + error.message);
        }
      } else {
        setEventDatas(result.events.eventsData);
        setTotalRows(result.events.totalRows);
      }
    }
  }, [loading, result, error, eventDatas]);

  const handleAddEvent = () => {
    setEditEventModal(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                <Typography sx={{ m: 1 }} variant="h4">
                  Events
                </Typography>
                <Box sx={{ m: 1 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleAddEvent()}
                  >
                    Add Event
                  </Button>
                  &nbsp;
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ minWidth: 500 }}>
                      <TextField
                        fullWidth
                        onChange={(event) => setSearch(event.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon fontSize="small" color="action">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Search Event"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8,
              }}
            >
              {editEventModal === true ? (
                <CreateEditEvent
                  editMode={editMode}
                  closeCreateEdit={closeCreateEdit}
                  editDatas={editDatas}
                />
              ) : null}
              {editEventModal === false ? (
                <Container maxWidth={false}>
                  <Box sx={{ pt: 3 }}>
                    {totalRows !== 0 ? (
                      <Grid container spacing={3}>
                        {eventDatas.map((eventsView) => (
                          <Grid item key={eventsView.id} lg={4} md={6} xs={12}>
                            <EventCard
                              eventsView={eventsView}
                              editMode={editMode}
                              showEditEventModal={showEditEventModal}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <h1>No data available</h1>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 3,
                    }}
                  ></Box>
                </Container>
              ) : null}
            </Box>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Events;
