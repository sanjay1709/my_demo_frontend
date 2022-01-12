import { gql } from "@apollo/client";
export const EVENTS_DATA = gql`
  query Events($offset: Int, $limit: Int, $search: String) {
    events(offset: $offset, limit: $limit, search: $search) {
      totalRows
      eventsData {
        id
        name
        description
        date
        organizer
      }
    }
  }
`;
