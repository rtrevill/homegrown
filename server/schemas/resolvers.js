const { Tech, Matchup, User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth')
const { GraphQLError } = require ('graphql');
const nodemailer = require("nodemailer");

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
    sendEmail: async (parent, {email}) => {

      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
            user: 'rtrevill98@myyahoo.com',
            pass: '**NEEDS TO BE CHANGED TO AN APP PASSWORD'
        },
        debug: false,
        logger: true
    });

            // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        console.log("Sending Mail");
        const info = await transporter.sendMail({
          from: '"Karson Haag 👻" <rtrevill98@myyahoo.com>', // sender address
          to: "rtrevill@hotmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }

      main().catch(console.error);

      return {data: "Email Sent"};
    }
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

      function errorThrow(){
          console.log("ERROR")
          throw new GraphQLError("Too Bad");
      }

      const checkEmail = await User.findOne({email: args.email})
      checkEmail ? errorThrow():  
      User.create(args);
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
