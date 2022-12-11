const mongoose = require('mongoose')
const Game = require("./models/games")

// start mongoose
mongoose.connect('mongodb://localhost:27017/videoGames', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const vidGames = [
    {
        title: 'god of war',
        genre: 'rpg',
        price: 69.99,
        sales: { online: 10, store: 20 },
        onSale: false
    },
    {
        title: 'horizon zero dawn',
        genre: 'rpg',
        price: 39.99,
        sales: { online: 15, store: 30 },
        onSale: false
    },
    {
        title: 'elden ring',
        genre: 'puzzle',
        price: 29.99,
        sales: { online: 2, store: 50 },
        onSale: true
    }
]

//saving the instances to our collection/model
//we don't need to use curly brackets after parenth beacuse we are using the array that we created
Game.insertMany(vidGames).then(data => { console.log(data) })
    .catch(err => { console.log(err) })