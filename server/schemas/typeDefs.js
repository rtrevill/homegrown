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

  type User {
    _id: ID!
    username: String!
  }

  type Auth {
    token: ID!
    profile: User
  }

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
    sendEmail(email: String): Confirm
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
    createNewUser(username: String!, password: String!, email: String!): Confirm
    login(name: String!, password: String!): Auth!
  }
`;

module.exports = typeDefs;
