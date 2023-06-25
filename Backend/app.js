require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const mongoAtlasURI = "mongodb+srv://imaraUser:imara123@imara-health2.l2kxkzz.mongodb.net/";
const cron = require("node-cron");
const notificationWorker = require("./workers/notificationWorker");
const userRoute = require("./routes/user");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRoute);

const corsOptions = {
  origin: "http://localhost:3000" // frontend URI (ReactJS)
}

app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', true);
mongoose.connect(mongoAtlasURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDb database(ATLAS)");
});
mongoose.connection.on("error", err => {
  console.log("Error connecting", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is still disconnected");
});

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`);
});

cron.schedule("34 21 * * *", () => {
  notificationWorker();
});