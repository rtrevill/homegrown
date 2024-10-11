const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const expiration = '4h';

// module.exports = {
function AuthenticationError(){ new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  })};

function signToken ({  username, _id }) {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, process.env.JSON_TOKEN_SECRET, { expiresIn: expiration });
  }
// };
module.exports ={AuthenticationError, signToken}
