import { gql } from '@apollo/client';

export const CREATE_MATCHUP = gql`
  mutation createMatchup($tech1: String!, $tech2: String!) {
    createMatchup(tech1: $tech1, tech2: $tech2) {
      _id
      tech1
      tech2
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export const CREATE_USER = gql`
mutation createNewUser($username: String!, $password: String!, $email: String!) {
  createNewUser(username: $username, password: $password, email: $email) {
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
    data
  }
}
`;