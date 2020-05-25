const router= require('express').Router();                     //importing the route.
let Exercise= require('../models/exercise.model');             //requiring the mongoose model that we recently created.

//The first route, endpoint that handles incoming http get requests on the /users url.
router.route('/').get((req,res)=>{
    Exercise.find()                                            //Mongoose method that is used to get the list of all the exercises in the mongoDB Atlas database.
    .then(exercises=>res.json(exercises))                      //res.json(). We are gonna return the exercises in JSON format.
    .catch(err=> res.status(400).json('Error: '+err));         //If there is an error, we catch it and return it with the error status 400.
});

//Handles http post requests.
router.route('/add').post((req,res)=>{
    const username= req.body.username;                         //username is assigned to a variable.
    const description= req.body.description;
    const duration= Number(req.body.duration);
    const date= Date.parse(req.body.date);

    const newExercise= new Exercise({
        username,
        description,
        duration,
        date,});                                               //new instance of exercise created using the username,description,duration and date.

    newExercise.save()                                         //user is saved to the database using the save method.
        .then(()=> res.json('Exercise added!'))                //this is returned if the user is added successfully.
        .catch(err=> res.status(400).json('Error: '+err));     //returns an error message 
});

//:id is like a variable. If we put the id we get the information related to that exercise.
router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)

    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)

    .then(exercise => res.json('Exercise deleted!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)

    .then(exercise => {
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration= Number(req.body.duration);
        exercise.date= Date.parse(req.body.date); //req.body holds parameters that are sent up from the client as part of a POST request
        
        exercise.save()
        .then(()=>res.json('Exercise Updated!'))
        .catch(err=> res.status(400).json('Error '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports=router;                                         //exporting the router.