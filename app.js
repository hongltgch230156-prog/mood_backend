const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const DATABASE_URI = "mongodb+srv://hongltgch230156:TYX4nmvIWGVL99tQ@mydbcluster.tjwmhci.mongodb.net/mood_journal";

mongoose.connect(DATABASE_URI)
  .then(() => console.log('Connect to DB succeed!'))
  .catch((err) => console.log('Connect to DB failed! ' + err));

app.use(express.json());

app.use(cors()); 

// Route
const moodRouter = require('./api/routes/moodRoute');
moodRouter(app);
const userRouter = require('./api/routes/userRoute');
userRouter(app);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server is running at port " + port);
});