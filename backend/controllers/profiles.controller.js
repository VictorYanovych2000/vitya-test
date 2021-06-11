const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error.modle");
const Profile = require("../models/profile");
const User = require("../models/user");

const getProfilesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithProfiles;
  try {
    userWithProfiles = await User.findById(userId).populate("profiles");
  } catch (e) {
    const error = new HttpError("Couldn't find any profile for this user", 500);
    return next(error);
  }

  if (!userWithProfiles || !userWithProfiles.profiles.length) {
    const error = new HttpError("Couldn't find any profile for this user", 404);
    return next(error);
  }

  res.json({
    profiles: userWithProfiles.profiles.map((p) =>
      p.toObject({ getters: true })
    ),
  });
};

const createProfile = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const { name, gender, birthDate, city, userId } = req.body;
  const newProfile = new Profile({ name, gender, birthDate, city, userId });

  let user;
  try {
    user = await User.findById(userId);
  } catch (e) {
    const error = new HttpError("Failed creating Profile", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldn't find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newProfile.save({ session: sess });
    user.profiles.push(newProfile);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (e) {
    const error = new HttpError("Failed creating Profile", 500);
    return next(error);
  }

  res.status(201).json({ profile: newProfile.toObject({ getters: true }) });
};

const getAllProfilesCount = async (req, res) => {
  try {
    await Profile.find({}, (err, result) => {
      if (err) {
        res.status(500).json('cantFindProfiles');
      } else {
        res.status(200).json({ count: result.length });
      }
    });
  } catch (e) {
    res.status(500).json('somethingWentWrongPleaseTryAgainLater');
  }
};


const getAdultProfilesCount = async (req, res) => {
  try {
    await Profile.find({}, (err, result) => {
      if (err) {
        res.status(500).json('cantFindProfiles');
      } else {
        const todayDate = new Date().getFullYear();
        const adultProfiles = result.map(profile => {
          const profileAge = profile.birthDate.getFullYear();
          return todayDate - profileAge;
        }).filter(profile => profile >= 18)
        res.status(200).json({ adultCount: adultProfiles.length });
      }
    });
  } catch (e) {
    res.status(500).json('somethingWentWrongPleaseTryAgainLater');
  }
};

const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const profileId = req.params.pid;
  const { name, gender, birthDate, city } = req.body;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (e) {
    const error = new HttpError("Couldn't update a profile with such id.", 500);
    return next(error);
  }

  profile.name = name;
  profile.gender = gender;
  profile.birthDate = birthDate;
  profile.city = city;

  try {
    await profile.save();
  } catch (e) {
    const error = new HttpError("Couldn't update a profile with such id.", 500);
    return next(error);
  }

  res.status(200).json({ profile: profile.toObject({ getters: true }) });
};

const deleteProfile = async (req, res, next) => {
  const profileId = req.params.pid;

  let profile;
  try {
    profile = await Profile.findById(profileId).populate("userId");
  } catch (e) {
    const error = new HttpError("Couldn't delete a profile with such id.", 500);
    return next(error);
  }

  if (!profile) {
    const error = new HttpError("Couldn't find a profile to delete.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await profile.remove({ session: sess });
    await profile.userId.profiles.pull(profile);
    await profile.userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (e) {
    const error = new HttpError("Couldn't delete a profile with such id.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Profile deleted" });
};

exports.getAllProfilesCount = getAllProfilesCount;
exports.getProfilesByUserId = getProfilesByUserId;
exports.getAdultProfilesCount = getAdultProfilesCount;
exports.createProfile = createProfile;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;
