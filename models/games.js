const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true,
        enum: ['rpg', 'adventure', 'puzzle', 'kids'],
        lowercase: true
    },

    price: {
        type: Number,
        required: true,
    },

    sales: {
        online: {
            type: Number,
            default: 1
        },
        store: {
            type: Number,
            default: 1
        }
    },

    onSale: {
        type: Boolean,
        default: false
    }
})

const Game = new mongoose.model('Game', gameSchema)

module.exports = Game;