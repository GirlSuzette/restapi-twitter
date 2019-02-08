const ODM = require("mongoose");

const User = require("../models/User");
const Tweet = require("../models/Tweet");

const Users = {
  index: (request, response) => {
    User
      .find()
      .populate({
        path: "tweet",
        select: "_id"
      })
      .exec()
      .then(users => {
        response
          .status(200)
          .json({
            meta: users.length,
            data: users
          });
      });
  },

  create: (request, response) => {
    const newUser = new User({
      _id: new ODM.Types.ObjectId(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      userName: request.body.userName,
      password: request.body.password,
    });

    console.log(newUser);

    newUser
      .save()
      .then(created => {
        response
          .status(200)
          .json({
            data: created
          });
      })

      .catch(error => console.log(error));
  },

  tweet: (request, response) => {
    User
      .findById(request.params.userId)
      .populate('tweets')
      .exec()
      .then(usertw => {
        response
          .status(200)
          .json({
            total: usertw.tweets.length,
            data: usertw.tweets
          })
      }).catch(error => console.log(error));
  },

  createTweet: (request, response) => {
    User
      .findById(request.params.userId)
      .exec()
      .then(usertw => {
        const newTweet = new Tweet({
          _id: new ODM.Types.ObjectId(),
          description: request.body.description,
          user: request.params.userId
        });


        console.log(newTweet)

        newTweet
          .save()
          .then(createdUser => {
            usertw.tweets.push(createdUser._id)
            usertw.save()
            response
              .status(200)
              .json({
                data: createdUser
              });

          })
          .catch(error => console.log(error));

      })
      .catch(error => console.log(error));
  },



  delete: (request, response) => {
    const { userId } = request.params;

    User
      .findOneAndDelete(userId)
      .exec()
      .then(deleted => {
        response
          .status(200)
          .json({
            msg: `${deleted.name} was deleted.`
          })
      })
  }

}

module.exports = Users;
