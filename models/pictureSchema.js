const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  characteristics: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  similarImg: {
    type: Object,
    required: true,
  },
});

module.exports = picturesList = mongoose.model("picturesList", PictureSchema);
