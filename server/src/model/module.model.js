const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Module', ModuleSchema);
