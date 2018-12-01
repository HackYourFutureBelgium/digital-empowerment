const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: String,
    role: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
