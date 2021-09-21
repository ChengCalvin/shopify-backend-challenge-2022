const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const pictureRoute = require("./route/api/pictures");

require("dotenv").config();
const app = express();

//express config
app.use(express.json());
app.use(cors());

//config routes
app.get("/", pictureRoute);
app.post("/api/insertpicture", pictureRoute);
app.delete("/api/:id", pictureRoute);

const uri = process.env.URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connected");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
