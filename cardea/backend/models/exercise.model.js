const mongoose= require('mongoose');  //require is like importing packages in python. Here we import modules instead.

const Schema= mongoose.Schema;     //all mongoose schemas basically start this way.

const exerciseSchema= new Schema({     //has four different fields.
    username:{
        type: String,
        required:true,
    },

    description: {
        type: String,
        required:true,
    },

    duration:{
        type: Number,
        required:true,
    },

    date:{
        type: Date,
        required:true,
    },
},{
    timestamps:true,              //automatically create a field stating when it was created and modified.
});

const Exercise= mongoose.model('Exercise',exerciseSchema);

module.exports=Exercise;