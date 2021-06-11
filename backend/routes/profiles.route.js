const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const profilesController = require("../controllers/profiles.controller");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);

router.get("/count", profilesController.getAllProfilesCount);
router.get("/adultCount", profilesController.getAdultProfilesCount);

router.get("/user/:uid", profilesController.getProfilesByUserId);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("city").not().isEmpty(),
    check("birthDate").isNumeric(),
  ],
  profilesController.createProfile
);

router.patch(
  "/:pid",
  [
    check("name").not().isEmpty(),
    check("city").not().isEmpty(),
    check("birthDate").isNumeric(),
  ],
  profilesController.updateProfile
);

router.delete("/:pid", profilesController.deleteProfile);

module.exports = router;
