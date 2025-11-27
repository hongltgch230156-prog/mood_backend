//import express framwork
const express = require('express')
const app = express() //declare express

//import mongoose
const mongoose = require('mongoose')

//declare db connection string URI with db name

//const DATABASE_URI = "mongodb://localhost:27017/mood_journal"
//mongoose.connect(DATABASE_URI) //connect to db
const db = 'mongodb+srv://hongltgch230156:<TYX4nmvIWGVL99tQ>@mydbcluster.tjwmhci.mongodb.net/mood_journal'
.then(() => console.log('Connect to DB succeed!'))
.catch((err) => console.log('Connect to DB failed!' + err))

app.use(express.json())  //parser(input)

//import cors
const cors = require('cors') 
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//route
const moodRouter = require('./api/routes/moodRoute');
moodRouter(app);
const userRouter = require('./api/routes/userRoute');
userRouter(app);

//start server
// const port = 5000;
// app.listen(port, () => {
//     console.log("Server is running at port " + port);
// })

app.listen(process.env.PORT || 3001)

