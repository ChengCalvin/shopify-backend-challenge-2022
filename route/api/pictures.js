const { json } = require("body-parser");
const express = require("express");
const pictureSchema = require("../../models/pictureSchema");
const PictureSchema = require("../../models/pictureSchema");

const pictureRoute = express.Router();

pictureRoute.get("/", (req, res) => {
  // {searchType, searchString}
  switch (req.query.searchType) {
    case "characteristics":
      PictureSchema.find({
        characteristics: req.query.searchValue,
      }).then((picture) => {
        res.json(picture);
      });
      console.log("getting char");
      break;
    case "text":
      PictureSchema.find({
        title: { $regex: `${req.query.searchValue}` },
      }).then((picture) => {
        res.json(picture);
      });
      console.log("getting text");
      break;
    case "url":
      PictureSchema.find({
        url: req.query.searchValue,
      }).then((picture) => {
        res.json(picture);
      });
      console.log("getting url");
      break;
    default:
      PictureSchema.find().then((picture) => {
        res.json(picture);
      });
      console.log("getting all");
      break;
  }
});

//for adding picture to database through Postman
pictureRoute.post("/api/insertpicture", async (req, res) => {
  if (req.body.imgArray.length > 1) {
    //construct an array of picture to store in backend from request
    const pictureLists = req.body.imgArray.map((picture) => {
      return new PictureSchema({
        url: picture.url,
        characteristics: picture.characteristics,
        title: picture.title,
        similarImg: picture.similarImg,
      });
    });

    PictureSchema.insertMany(pictureLists)
      .then(() => {
        res.status(200).json("Successfully Stored!");
      })
      .catch((e) => {
        res.status(400).json("Something went wrong trying to store data: ", e);
      });
  } else {
    // only insert 1 picture
    const newPicture = new PictureSchema({
      imgArray: [
        {
          url: req.body.imgArray[0].url,
          characteristics: req.body.imgArray[0].characteristics,
          title: req.body.imgArray[0].title,
          similarImg: req.body.imgArray[0].similarImg,
        },
      ],
    });
    newPicture.save().then((picture) => {
      console.log(picture);
      res.json(picture);
    });
  }
});

module.exports = pictureRoute;
