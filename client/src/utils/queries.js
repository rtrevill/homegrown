import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query userDetails($id: ID!) {
    userDetails(_id: $id) {
      username
      first_name
      last_name
      email
      location{
      address}
      _id
    }
  }
`;
