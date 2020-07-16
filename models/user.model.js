const mongoose = require("mongoose");
const validator = require("validator");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  avatar: {
    type: Buffer,
    required: true,
  },
  experience: [
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// @ Action - encrypt the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// @Action - Get auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "jwtSecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// @Action - Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Please enter authorized email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is not matched");
  }
  return user;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
