const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  passward: {
    type: String,
    required: true,

  },
  contact: {
    type: String,
  },
});

const UserModel = mongoose.model("Auth", UserSchema);

module.exports = UserModel;
