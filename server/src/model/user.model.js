const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    passwordResetToken: {
      type: String,
      default: null,
      index: {
        unique: true,
        partialFilterExpression: { passwordResetToken: { $type: 'string' } }
      }
    },
    role: String,
    isPending: Boolean
  },
  {
    timestamps: true
  }
);

UserSchema.virtual('isAdmin')
  .get(function determineIfAdmin() {
    return this.role === 'admin';
  });

module.exports = mongoose.model('User', UserSchema);
