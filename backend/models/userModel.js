const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (req, res) {
  const validEmail = validator.isEmail(req.body.email);
  if (!validEmail) {
    throw Error("Invalid format email");
  }
  const existedEmail = await this.findOne({ email: req.body.email });

  if (existedEmail) {
    throw Error("E-mail already registered");
  }

  const strongPassword = validator.isStrongPassword(req.body.password);

  if (!strongPassword) {
    throw Error(
      "password minimal 8 karakter, dan harus terdiri dari minimal 1 huruf kapital, huruf kecil, angka, dan simbol"
    );
  }

  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = await this.create({
    email: req.body.email,
    password: hashPassword,
  });

  return newUser;
};

userSchema.statics.login = async function (req, res) {
  if (!req.body.email || !req.body.password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      return user;
    } else {
      throw Error("Wrong credentilas");
    }
  }

  if (!user) {
    throw Error("E-mail not registered");
  }
};

module.exports = mongoose.model("User", userSchema);
