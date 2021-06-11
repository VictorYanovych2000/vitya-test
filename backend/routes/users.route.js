const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.getUsers);

router.get("/count", usersController.getAllUsersCount);

router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty().isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty().isLength({ min: 6 }),
  ],
  usersController.login
);

router.get("/:uid", usersController.getUserById);

router.patch("/:uid", usersController.updateUser);

router.delete("/:uid", usersController.deleteUser);

module.exports = router;
