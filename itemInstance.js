
//we need both mongoose and the model(Gamemodel) to insert a new instance to our model that's why we need to require them.
const mongoose = require('mongoose');
const Gamemodel = require('./model/itemModel.js')

// start mongoose and naming our DB
//we need to connect to the db because we need to save the instances that we will create to the db.
mongoose.connect('mongodb://localhost:27017/GamesDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

//make sure all the details are exactly the same in the schema or else nothing will save
const itemInstance = [
    {
        name: 'god of war',
        genre: 'rpg',
        description: 'an rpg that tells the story of Kratos and his son Atreus',
        price: 69
    },
    {
        name: 'horizon zero dawn',
        genre: 'rpg',
        description: 'a post-apocalyptic adventure that involves dino robots',
        price: 50
    },
    {
        name: 'tetris',
        genre: 'puzzle',
        description: 'a classic game that every gamer household should have',
        price: 10
    },
    {
        name: 'devil may cry',
        genre: 'action',
        description: 'non stop combo action',
        price: 30,
    }
]

// //we only use this for saving individual instances
// gameProducts.save().then(data => { console.log(data) })
//     .catch(err => { console.log(err) })

//for saving soemthing like this(an array of items) we use insertMany
Gamemodel.insertMany(itemInstance).then(data => { console.log(data) })
    .catch(err => { err })

