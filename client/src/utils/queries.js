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

export const FIND_PRODUCE = gql`
  query findProduce($string: String) {
    findProduce(string: $string) {
      produce
      variant
    }
  }
`;

