const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    default: () => uuidv4(),
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

userSchema.methods.saveUser = async function () {
  try {
    const savedUser = await this.save();
    return savedUser;
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findById(id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
userSchema.statics.getUserByUsername = async function (username) {
  try {
    const user = await this.findOne({ username });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
