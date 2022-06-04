const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoresSchema = new Schema({
    roomID: {
        type: String,
        required: true
    },
    playerID: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Score = mongoose.model('scores', scoresSchema);

module.exports = Score;