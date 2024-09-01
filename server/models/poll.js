const mongoose = require('mongoose');
const User = require('./user');

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
    minlength: 1,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    question: {
      type: String,
      required: true,
      minlength: 1,
    },
    options: [optionSchema],
    voted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

pollSchema.pre('remove', async function (next) {
  try {
    const user = await User.findById(this.user);
    if (user) {
      user.polls = user.polls.filter(
        poll => poll._id.toString() !== this._id.toString(),
      );
      await user.save();
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Poll', pollSchema);
