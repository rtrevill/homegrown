const typeDefs = `

  type Confirm {
    data: String!
  }

  type Addresses {
    locationtype: String
    address: String
  }

  type User {
    _id: ID!
    username: String!
    first_name: String
    last_name: String
    email: String!
    location: [Addresses]
    currentitems: [Currentproduce]
  }

  type Auth {
    token: ID!
    profile: User
  }

  type ProduceTypes {
    _id: ID!
    produce: String!
    variant: String!
  }

  type Currentproduce {
    itemtype: ID!
    itemdetail: ID
    location: ID!
  }

  type Query {
    sendEmail(email: String): Confirm
    userDetails(_id: ID!): User
    findProduce(string: String): [ProduceTypes]
  }

  type Mutation {
    createNewUser(username: String!, password: String!, email: String!, clearance: Int!): Confirm
    login(name: String!, password: String!): Auth!
    updateDefLocate(userID: ID!, lat: Float!, lng: Float!, address: String!, placeId: String!): User!
    updateDetails(userID: ID!, first_name: String, last_name: String, username: String, email: String): User!
    changePassword(userID: ID!, original: String, newpword: String): User!
    addProduce(produce: String, variant: String): ProduceTypes
    addUserProduce(userID: ID!, itemtype: [ID!], itemdetail: [ID], location: ID): Confirm
  }
`;

module.exports = typeDefs;
