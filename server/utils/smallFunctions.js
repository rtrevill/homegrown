const { GraphQLError } = require ('graphql');


function errorThrow(code){
    console.log("ERROR")
    if (code===1)
    { throw new GraphQLError("This produce has already been added") }
    if (code===2)
      { throw new GraphQLError("This username is already taken") }
  
    throw new GraphQLError("Email already used by another user");
  }

  module.exports ={errorThrow}