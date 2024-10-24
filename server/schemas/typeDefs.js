const typeDefs = `

  type Confirm {
    data: String!
  }

  type Addresses {
    locationtype: String
    address: String
    _id: ID
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
    _id: ID
    itemtype: ID!
    itemproduce: String!
    itemvariant: String!
    itemdetail: String
    location: ID
  }
    
  input UserCurrentproduce {
    itemtype: ID!
    itemproduce: String!
    itemvariant: String!
    itemdetail: String
    location: ID
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
    addUserProduce(userID: ID!, produce: [UserCurrentproduce]): User!
  }
`;

module.exports = typeDefs;
