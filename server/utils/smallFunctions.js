
function errorThrow(){
    console.log("ERROR")
    throw new GraphQLError("Email already used by another user");
  }

  module.exports ={errorThrow}