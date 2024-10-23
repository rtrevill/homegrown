import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createNewUser($username: String!, $password: String!, $email: String!, $clearance: Int!) {
    createNewUser(username: $username, password: $password, email: $email, clearance: $clearance) {
      data
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    profile {
      _id
      username
    }
    token
  }
}
`;

export const UPDATE_LOCATION_DETAILS = gql`
mutation updateDefLocate($userId: ID!, $lat: Float!, $lng: Float!, $address: String!, $placeId: String!) {
  updateDefLocate(userID: $userId, lat: $lat, lng: $lng, address: $address, placeId: $placeId) {
    username
  }
}
`;

export const UPDATE_USER_DETAILS = gql`
  mutation UpdateDetails($userId: ID!, $firstName: String, $lastName: String, $username: String, $email: String) {
    updateDetails(userID: $userId, first_name: $firstName, last_name: $lastName, username: $username, email: $email) {
      _id
      username
      first_name
      last_name
      email
      location {
        address
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation Mutation($userId: ID!, $original: String, $newpword: String) {
    changePassword(userID: $userId, original: $original, newpword: $newpword) {
      username
    }
  }
`;

export const ADD_PRODUCE = gql`
  mutation addProduce($produce: String, $variant: String) {
    addProduce(produce: $produce, variant: $variant) {
      produce
      variant
    }
  }
`;

export const ADD_USER_PRODUCE = gql`
  mutation addUserProduce($userId: ID!, $produce: [UserCurrentproduce]) {
    addUserProduce(userID: $userId, produce: $produce) {
      first_name
    }
  }
`;
