const { text } = require('express');
const mongoose = require('mongoose');

//defining a schema(an object)
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },

    genre: {
        type: String,
        required: true,
        enum: ['rpg', 'puzzle', 'action']
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
})

//create a model:
//problem: Gamemodel not being declared: soln: forgot to const Gamemodel
const Gamemodel = new mongoose.model('Gamemodel', gameSchema);
//export the model then require it in pages that needs the instances
module.exports = Gamemodel;