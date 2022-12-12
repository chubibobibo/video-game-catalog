const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
//Gamemodel was created therefore we need to specify it's loaction/path
const Gamemodel = require('./model/itemModel.js')
// allows for parsing 
const methodOverride = require('method-override')
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/GamesDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// //routes to use:
// adding games: /index
// listing all games: /allGames
// detail of all games: /allGames/:id
//====================================================

//to use the views folder
app.set('views', path.join(__dirname, 'views'));
//to use ejs files
app.set('view engine', 'ejs');
//to use public directory where js, css, style.css are located
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))//allow to override post method to patch or delete


//express routes

//render index
app.get('/index', (req, res) => {
    res.render('index.ejs')
})

//render /allGames(allGames.ejs) that will show all items in the Model:
app.get('/allGames', async (req, res) => {
    //destructure the query string if available
    const { genre } = req.query
    //create a conditional that searches for the same query string(genre=something) from req.query and serch es the db for the same genre. else just render a normal /allGames page
    // if a query string is requested, then allItems will be just the items that have the same query string value(genre=rpg)
    if (genre) {
        const allItems = await Gamemodel.find({ genre })
        res.render('allGames.ejs', { allItems, genre })
    } else {
        const allItems = await Gamemodel.find({})//await to find all items in the model then include it to the render, to be used in iterating
        res.render('allGames.ejs', { allItems, genre: 'all' }) //the found items}
        //we added genre:all to use in the if statement to show all games button to appear only when there is a query string
    }
})

//adding new items in the model:
//async because we need to save to the Db model
//we are going to send the created item to the /allGames page
//we are not  going to destructure the req.body because we are taking all the data as a whole.
//async function because we need to access the database to insert new items, then we need to await the saving process iteself cause it takes time
app.post('/allGames', async (req, res) => {
    await Gamemodel.insertMany(req.body)
    res.redirect('/allGames')
})

//create a route to the /detailGames with :id provided by the links form /allGames
//destructure params to use in finding the specific id from the our model(Gamemodel)
//we use async cause we have to find the id in our DB and we need to await the searching cause it takes time.
app.get('/detailGames/:id', async (req, res) => {
    const { id } = req.params;
    const foundGame = await Gamemodel.findById(id)
    res.render('detailGames', { foundGame })
})

//create a route to /editGame to provide a way to edit existing values  of specific items/
//we need to destructure id again to use it to find in the model db the specific item we want to edit
//problem: page not rendering: soln: error in using curly bracket when passing id inf findById
app.get('/editGame/:id', async (req, res) => {
    const { id } = req.params;
    const foundGame = await Gamemodel.findById(id)
    res.render('editGame.ejs', { foundGame })
})

//create a put route(we use put cause we are going to take all the data in the form to update the existing items)
//do not change the name property of the inputs in the ejs file so that req.body will not be confused as to where it is going to take values from.
//we need to include :id params and use it to find the specific item we want to edit in the model DB(Gamemodel)
//remember to async because we are req something from the DB
//we used detailGames/:id because we want to save the new value in to this page that has a specific item.
app.put('/detailGames/:id', async (req, res) => {
    const { id } = req.params;
    //syntax for findByIdAndUpdate will include (what to change, the new value, options) 
    await Gamemodel.findByIdAndUpdate(id, req.body, { rundValidators: true, new: true })
    //we can't use express code, instead we used string literal to pass id to the link to be redirected
    res.redirect(`/detailGames/${id}`)
})

//create a route to delete specific item in model DB.
//destructured :id params to be used in finding a specific item and delete it.
//we need to create a new form in /detailGames to change the method of post to delete and add a button to delete
//we used the path detailGames/:id because that's where we are going to submit delete(a specific item)
app.delete('/detailGames/:id', async (req, res) => {
    const { id } = req.params;
    await Gamemodel.findByIdAndDelete(id)
    res.redirect('/allGames')
})








app.listen(3000, () => {
    console.log('LISTENING TO PORT 3000')
})