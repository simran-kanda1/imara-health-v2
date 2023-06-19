const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  phoneNumber: { type: String, required: true, unique : true },
  appointmentDate : {type: String},
  showTime: {type: String},
  status: {type: String},
});

module.exports = mongoose.model('User', UserSchema);