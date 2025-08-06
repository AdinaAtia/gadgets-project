const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Product"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    
    },
    {
        timestamps: true
    })
    module.exports=mongoose.model("Cart",cartSchema)