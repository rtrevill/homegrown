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
      longlat
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

export const FIND_PROD_LOCATIONS = gql`
  query findProdLocations($radius: Int) {
    findProdLocations(radius: $radius) {
      address
      _id
      longlat
      longitude
      latitude
      userRef {
        username
        currentproduce {
          _id
          itemdetail
          location
          producetype {
            _id
            produce
            variant
          }
        }
      }
    }
  }
`;

