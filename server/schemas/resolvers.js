const { User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth')
const { GraphQLError } = require ('graphql');
const nodemailer = require("nodemailer");
const bcryptjs = require('bcryptjs');
const { errorThrow } = require('../utils/smallFunctions')


const resolvers = {
  Query: {
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
    },

    userDetails: async (parent, {_id}) => {
      try{
        return await User.findById(_id);
      }catch(err){
        throw new GraphQLError("Error with user details")
      }
    },


  },
  Mutation: {
    createNewUser: async (parent, args) => {

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

    updateDefLocate: async (parent, args) => {
      const {lat, lng, address, placeId, userID} = args
      const findUser = await User.findById(userID)

      if (findUser.location.length === 0){
        try{
          await User.findByIdAndUpdate(userID, {$set: {"location":
            { locationtype: "default",
              latitude: lat,
              longitude: lng,
              address: address,
              locationId: placeId
            }}})
            return findUser
          }catch(error){console.log(error)}
      }
      else{
        try{
          await User.findOneAndUpdate({_id: userID, "location.locationtype": "default"}, {$set: 
            {
              'location.$.latitude': lat,
              'location.$.longitude': lng,
              'location.$.address': address,
              'location.$.locationId': placeId
            }})
            return findUser
          }catch(error){console.log(error)}
      }
    },

    updateDetails: async (parent, args) => {
      const { first_name, last_name, email, username, userID } = args;
      const emailCheck = await User.findOne({email: email, _id: {$nin: [userID]}})
      
      if (emailCheck !== null) {errorThrow()} 
      
      else return await User.findByIdAndUpdate(userID, {$set: 
          { first_name, last_name, username, email}
        }, {new: true})
    },
    
    changePassword: async (parent, args) => {
      const {userID, original, newpword} = args;
      const profile = await User.findById(userID);
      const correctPw = await profile.isCorrectPassword(original);

      if (!correctPw) {
        throw AuthenticationError
      }

      const salt = bcryptjs.genSaltSync(10);
      return await User.findByIdAndUpdate(userID, {password: 
        bcryptjs.hashSync(newpword, salt)});

    },
  },
};

module.exports = resolvers;
