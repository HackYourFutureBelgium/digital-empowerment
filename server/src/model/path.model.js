const mongoose = require('mongoose');

const PathSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    modules: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Path', PathSchema);
