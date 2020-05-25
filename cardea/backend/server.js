/*Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.*/

const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose')  //Help us to connect to our mongodb database
mongoose.set('useUnifiedTopology', true);

require('dotenv').config();   //Getting the environment variables in the dotenv file.

const app= express();      //This is how we are gonna create our express server.
const port= process.env.POST||5000;   //Port that the server will be on.

app.use(cors());               //cors middleware
app.use(express.json());       //Allow us to pass json as the server will be recieving JSON

const uri= process.env.ATLAS_URI;         //Database uri (uniform resource identifier -String of characters that identifies a particular resource)
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true}   //This is how we start the connection with the database.
);

const connection= mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connectione established successfully!");
})

const exercisesRouter= require('./routes/exercises');
const usersRouter= require('./routes/users');

app.use('/exercises',exercisesRouter);      //app.use() to use these imported files
app.use('/users',usersRouter);               //if we go to the route and use /users it will load everything the users router. same thing happens with excercises.

app.listen(port,()=>{          //Code that started the server by listening to the port.
    console.log(`Server is running on port:${port}`);
})