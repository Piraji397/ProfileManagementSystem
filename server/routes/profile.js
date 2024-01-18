const express = require("express");
const router = express.Router();

const {
  uploadProfileImage,
  getAllProfileImage,
  downloadImage,
  deleteProfileImage,
} = require("../controllers/Profile");
const { auth } = require("../moddlewares/auth");
const { upload } = require("../moddlewares/multer");

router.post(
  "/uploadProfileImage",
  auth,
  upload.single("profileImage"),
  uploadProfileImage
);

router.get("/getAllProfileImage", auth, getAllProfileImage);

router.post("/downloadImage", auth, downloadImage);

router.delete("/deleteProfileImage", auth, deleteProfileImage);

module.exports = router;
