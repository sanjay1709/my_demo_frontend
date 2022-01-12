import { gql } from "@apollo/client";
export const DELETE_EVENT = gql`
  mutation Mutation($eventId: Int!) {
    deleteEvent(eventID: $eventId) {
      status
      msg
    }
  }
`;

export const ADD_EVENT = gql`
  mutation Mutation($event: event) {
    addEvent(event: $event) {
      status
      msg
      events {
        id
        name
        description
        date
        organizer
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation Mutation($eventId: ID!, $event: event) {
    updateEvent(eventID: $eventId, event: $event) {
      events {
        id
        name
        description
        date
        organizer
      }
      status
      msg
    }
  }
`;
