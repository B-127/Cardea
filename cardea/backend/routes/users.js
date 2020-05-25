const router= require('express').Router();             //importing the route.
let User= require('../models/user.model');             //requiring the mongoose model that we recently created.

//The first route, endpoint that handles incoming http get requests on the /users url.
router.route('/').get((req,res)=>{
    User.find()                           //Mongoose method that is used to get the list of all the users in the mongoDB Atlas database.
    .then(users=>res.json(users))         //res.json(). We are gonna return the users in JSON format.
    .catch(err=> res.status(400).json('Error: '+err));  //If there is an error, we catch it and return it with the error status 400.
});

//Handles http post requests.
router.route('/add').post((req,res)=>{
    const username= req.body.username;          //username is assigned to a variable.

    const newUser= new User({username});        //new instance of user using the username.

    newUser.save()                              //user is saved to the database using the save method.
        .then(()=> res.json('User added!'))      //this is returned if the user is added successfully.
        .catch(err=> res.status(400).json('Error: '+err)); //returns an error message 
});

module.exports=router;                          //exporting the router.