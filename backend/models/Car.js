const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({

    make: {
        type:String,
        required:true,
    },
    model: {
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    year: {
        type:Number,
        required:true,
    },
    image: {
        type:String,
        required:true,
    },
    seat:{
        type:Number,
        required:true,
    },
    availability: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
})

const CarModel = mongoose.model("cars", CarSchema)
module.exports = CarModel;