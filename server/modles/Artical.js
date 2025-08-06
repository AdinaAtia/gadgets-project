const mongoose = require("mongoose")
const articalSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    active:{
        type:Boolean,
        default:false
    },
    author:{
        type:String
    },
    category:{
        type:String
    },
},
    {
        timestamps: true
    })
    module.exports=mongoose.model("Artical",articalSchema)