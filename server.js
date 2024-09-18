const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5001;

//Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://gvivero1:Jakie-1209@2do2gether.qobgm.mongodb.net/?retryWrites=true&w=majority&appName=2do2gether",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
