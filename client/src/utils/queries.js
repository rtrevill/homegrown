import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query userDetails($userId: ID) {
  userDetails(userID: $userId) {
    _id
    username
    first_name
    last_name
    email
    currentitems {
      _id
      itemtype
      itemproduce
      itemvariant
      itemdetail
      location
    }
    produceLocation {
      _id
      locationtype
      address
      locationId
      latitude
      longitude
    }
  }
}
`;

export const FIND_PRODUCE = gql`
  query findProduce($string: String) {
    findProduce(string: $string) {
      _id
      produce
      variant
    }
  }
`;

