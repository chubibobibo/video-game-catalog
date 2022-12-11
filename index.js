const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Game = require('./models/games.js')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// start mongoose
mongoose.connect('mongodb://localhost:27017/videoGames', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



app.get('/test', (req, res) => {
    res.send('It is alive')
})



app.listen(3000, () => {
    console.log('LISTENING TO PORT 3000')
})