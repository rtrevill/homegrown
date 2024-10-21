const typeDefs = `
  type Tech {
    _id: ID!
    name: String!
  }

  type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
  }

  type Confirm {
    data: String!
  }

  type Addresses {
    address: String
  }

  type User {
    _id: ID!
    username: String!
    first_name: String
    last_name: String
    email: String!
    location: [Addresses]
  }

  type Auth {
    token: ID!
    profile: User
  }

  type Query {
    sendEmail(email: String): Confirm
    userDetails(_id: ID!): User
  }

  type Mutation {
    createNewUser(username: String!, password: String!, email: String!): Confirm
    login(name: String!, password: String!): Auth!
    updateDefLocate(userID: ID!, lat: Float!, lng: Float!, address: String!, placeId: String!): Confirm!
    updateDetails(userID: ID!, first_name: String, last_name: String, username: String, email: String): User!
  }
`;

module.exports = typeDefs;
