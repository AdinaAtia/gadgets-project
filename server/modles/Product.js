const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    descreption: {
        type: String,
        // require: true
    },
    price:{
        type:Number,
        min:0,
        require: true
        
    },
    company:{
        type: String,
        // require: true

    },
    img: {
        type: String,
        require: true
    },

    
    },
    
   
    {
        timestamps: true
    })
module.exports = mongoose.model("Product", productSchema)