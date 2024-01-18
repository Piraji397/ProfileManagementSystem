const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    const filedata = file.originalname.split(".");
    const uniqueSuffix =
      Date.now() + "." + file.originalname.split(".")[filedata.length - 1];
    console.log("File", uniqueSuffix);
    cb(null, file.originalname.replace(".jpg", "_" + uniqueSuffix));
  },
});

exports.upload = multer({ storage });
