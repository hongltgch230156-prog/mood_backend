//import mongoose
const mongoose = require('mongoose')

const ALLOWED_MOODS = ['Excellent', 'Happy', 'Motivated', 'Neutral', 
                       'Stressed', 'A bit sad', 'Angry/Sad', 'Tired'];

//declare schemas
const moodSchema = mongoose.Schema({
    date:{
        type: Date,
        default: Date.now,
        required: [true, "Date is compulsory"],
        
    },
    mood:{
        type: String,
        required: [true, "Choose an emotion that suits you"],
        enum: {
            values: ALLOWED_MOODS,
            message: '{VALUE} is not a valid mood'
        }
    },
    emoji: {
    type: String,     
    required: true,
    },
    score:{
        type: Number,
        required: true,
        min: [1, "Minimum score is 1"],
        max: [10, "Maximum score is 10"],
    },
    note:{
        type: String,
        trim: true,
    },
})
const moodModel = mongoose.model('moods', moodSchema)
module.exports = moodModel