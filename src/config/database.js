const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://madanreddy0310:6LPDER7oOGgPQr6u@namastenode.8lonsnr.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
