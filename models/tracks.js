const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Challenges = require('../models/challenges')

const TrackSchema = new Schema({
    name:   {
        type: String,
        required: [true,'name is required']
    },
    creator: {
        type: String,
        required: [true,'Username of creator is required']
    },
    number_of_challenges: {
        type: Number,
        required: [true,'number of challenges is required']
    },
    challenges: [Challenges.challengeSchema], 
    track_ranking: Number,
    number_of_plays: Number
});

module.exports = mongoose.model('Track',TrackSchema);