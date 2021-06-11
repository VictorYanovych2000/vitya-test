const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error.modle");
const User = require("../models/user");
const Profile = require("../models/profile");

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate("profiles");
  } catch (e) {
    return next(new HttpError("Something went wrong, couldn't get user", 500));
  }

  if (!user) {
    return next(new HttpError("User with this id not found", 404));
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const { username, email, password, role } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return next(
      new HttpError("Something went wrong, user not registered", 500)
    );
  }

  if (existingUser) {
    return next(new HttpError("User already exists", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return next(
      new HttpError("Something went wrong, user not registered", 500)
    );
  }

  let newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
    profiles: [],
  });

  try {
    await newUser.save();
  } catch (e) {
    return next(new HttpError("Something went wrong, user not saved", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.TOKEN_KEY,
      { expiresIn: "30d" }
    );
  } catch (e) {
    return next(
      new HttpError("Something went wrong, user not registered", 500)
    );
  }

  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
    token,
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return next(new HttpError("Something went wrong, user not logged in", 500));
  }

  if (!existingUser) {
    return next(new HttpError("No such user or wrong credentials", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (e) {
    return next(new HttpError("Couldn't login a user", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("No such user or wrong credentials", 401));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "30d" }
    );
  } catch (e) {
    return next(new HttpError("Logging in failed, something went wrong", 500));
  }

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
    token,
  });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (e) {
    const error = new HttpError("Couldn't find users", 500);
    return next(error);
  }

  if (!users || !users.length) {
    const error = new HttpError("Couldn't find any users for this user", 404);
    return next(error);
  }

  res.json({
    users: users.map((u) => u.toObject({ getters: true })),
  });
};

const getAllUsersCount = async (req, res) => {
  try {
    await User.find({}, (err, result) => {
      if (err) {
        res.status(500).json('cantFindUsers');
      } else {
        res.status(200).json({ count: result.length });
      }
    });
  } catch (e) {
    res.status(500).json('somethingWentWrongPleaseTryAgainLater');
  }
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const userId = req.params.uid;
  const { username, email, role } = req.body;

  let user;
  try {
    user = await User.findById(userId).populate("profiles");
  } catch (e) {
    const error = new HttpError("Couldn't update a user with such id.", 500);
    return next(error);
  }

  user.username = username;
  user.email = email;
  user.role = role;

  try {
    await user.save();
  } catch (e) {
    const error = new HttpError("Couldn't update a user with such id.", 500);
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (e) {
    const error = new HttpError("Couldn't delete a user with such id.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldn't find a user to delete.", 404);
    return next(error);
  }

  try {
    await user.remove();
    await Profile.remove({
      userId,
    });
  } catch (e) {
    const error = new HttpError("Couldn't delete a user with such id.", 500);
    return next(error);
  }

  res.status(200).json({ message: "User deleted" });
};

exports.getAllUsersCount = getAllUsersCount;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
