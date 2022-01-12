import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    adminlogin(email: $email, password: $password) {
      status
      msg
      firstName
      lastName
      email
      userName
      role
      token
      tokenExpiration
    }
  }
`;
export default LOGIN_USER;
