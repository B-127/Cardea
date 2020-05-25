const mongoose= require('mongoose');  //require is like importing packages in python. Here we import modules instead.

const Schema= mongoose.Schema;     //all mongoose schemas basically start this way.

const userSchema= new Schema({     //only has a single field. username. Along with some validations for the username.
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true,                //trims spaces
        minlength:3
    },
},{
    timestamps:true,              //automatically create a field stating when it was created and modified.
});

const User= mongoose.model('User',userSchema);

module.exports=User;