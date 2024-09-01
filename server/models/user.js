const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes whitespace from both ends
    },
    password: {
      type: String,
      required: true,
    },
    polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10; // Use environment variable or default to 10
    const hashed = await bcrypt.hash(this.password, saltRounds);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (attempt) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model('User', userSchema);
