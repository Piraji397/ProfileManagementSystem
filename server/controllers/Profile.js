const otpGenerator = require("otp-generator");
const fs = require("fs");
const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
require("dotenv").config();

exports.uploadProfileImage = async (req, res) => {
  try {
    //get the userId from request
    const userId = req.user.id;
    const profileImage = req.file.filename;
    console.log("profileImage", profileImage);
    console.log("file", req.file);

    if (!userId || !profileImage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Database save is remaining and update the user userProfiles field
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const result = await UserProfile.findOne({ profileUniqueId: otp });

    while (result) {
      // console.log("result - ", result);
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const newProfileData = await UserProfile.create({
      profileImage,
      profileUniqueId: otp,
    });
    console.log("newProfileData", newProfileData);

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          userProfiles: newProfileData._id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: newProfileData,
      message: "Profile image uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading image",
    });
  }
};

exports.getAllProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userProfilesData = await User.findById(userId)
      .populate("userProfiles")
      .exec();
    userProfilesData.password = undefined;
    console.log("userProfilesData", userProfilesData);

    // headers: {
    //   'Content-Disposition': 'inline'
    // }
    return res.status(200).json({
      success: true,
      data: userProfilesData.userProfiles,
      message: "All profile images fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetched profile images",
    });
  }
};

exports.downloadImage = async (req, res) => {
  try {
    const { imageId, passCode } = req.body;
    if (!imageId || !passCode) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }

    const profiileData = await UserProfile.findById({ _id: imageId });

    if (!profiileData) {
      return res.status(404).json({
        success: false,
        message: "No such profile image is present",
      });
    }

    if (passcode !== profiileData.profileUniqueId) {
      return res.status(401).json({
        success: false,
        message: "Passcode is incorrect",
      });
    }

    let image = process.env.IMAGE_PATH + profileData.profileImage;
    res.download(image);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not download image",
    });
  }
};

exports.deleteProfileImage = async (req, res) => {
  try {
    const { imageId } = req.body;
    const userId = req.user.id;

    if (!imageId || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }

    const profileData = await UserProfile.findById({ _id: imageId });

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: "File is not present",
      });
    }

    // console.log("profileData", profileData);
    let filePath = process.env.IMAGE_PATH + profileData.profileImage;
    // console.log("filePath", filePath);

    fs.unlinkSync(filePath);

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          userProfiles: profileData._id,
        },
      }
    );

    await UserProfile.findByIdAndDelete(profileData._id);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not delete the file",
    });
  }
};
