const { Tech, Matchup, User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    createNewUser: async (parent, args) => {
      await User.create(args);
      return { data: "Finished"} ;
    },
    login: async (parent, { name, password }) => {
      const profile = await User.findOne({ username: name });

      
      if (!profile) {
        throw AuthenticationError
      }
      
      const correctPw = await profile.isCorrectPassword(password);
      
      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(profile);
      return { token, profile };
    },
  },
};

module.exports = resolvers;
