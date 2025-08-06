const mongoose = require("mongoose")
const stepSchema = new mongoose.Schema({
    title: {
        type: String
    },
    step: {
        type: Number
    },
    complete: {
        type: Boolean
    },

},
    { timestamps: true })
    module.exports=stepSchema