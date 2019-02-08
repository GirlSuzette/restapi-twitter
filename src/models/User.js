const ODM = require('mongoose');

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tweets: [{
    type: ODM.Schema.Types.ObjectId,
    ref: 'Tweet'
  }]
}, { timestamps: true });

module.exports = ODM.model('User', Schema);