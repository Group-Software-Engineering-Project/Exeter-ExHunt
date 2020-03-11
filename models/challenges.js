// routes/challenges.js
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//ChallengeSchema model
const ChallengeSchema = new Schema({
    TrackID : mongoose.Schema.ObjectId,
    Location : [Number],
    Vid1ID : mongoose.Schema.ObjectId,
    Vid2ID : mongoose.Schema.ObjectId
}) 

module.exports = {
    challengeModel: mongoose.model('Challenges',ChallengeSchema),
    challengeSchema: ChallengeSchema
} 