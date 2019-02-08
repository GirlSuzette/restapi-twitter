const ODM = require("mongoose");

const Tweet = require("../models/Tweet");
const User = require('../models/User');

const Tweets = {
  index: (request, response) => {
    Tweet
      .find()
      .populate({
        path: "user",
        select: "_id firstName"
      })
      .exec()
      .then(tweets => {
        response
          .status(200)
          .json({
            Total: tweets.length,
            data: tweets
          });
      })
      .catch(error => console.log(error));
  },

  likes: (request, response) => {
    Tweet
      .findById(request.params.tweeId)
      .populate({
        path: 'likes',
        select: "_id"
      })
      .exec()
      .then(tw => {
        response
          .status(200)
          .json({
            total: tw.likes.length,
            data: tw.likes
          })
      })
      .catch(error => console.log(error));
  },
  createLike: (request, response) => {
    console.log(request.body)
    Tweet
      .findById(request.params.tweetId)
      .exec()
      .then(tweesU => {
        User
          .findById(request.body.user)
          .exec()
          .then(userTw => {
            tweesU.likes.push(userTw._id);
            tweesU.save();
            response
              .status(200)
              .json({
                data: `${foundUser.firstName} ${foundUser.lastName} liked the tweet`
              });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));

  },


  delete: (request, response) => {
    const { companyId } = request.params;

    Company
      .findOneAndDelete(companyId)
      .exec()
      .then(company => {
        response
          .status(200)
          .json({
            msg: `${company.name} was deleted.`
          });
      })
      .catch(error => console.log(error));
  },

  users: (request, response) => {
    Tweet
      .findById(request.params.userId)
      .populate("users")
      .exec()
      .then(tweets => {
        // console.log(tweets.employees)
        response
          .json({
            meta: tweets.user.length,
            data: tweets.user
          });
      })
      .catch(error => console.log(error));
  }
};

module.exports = Tweets;
