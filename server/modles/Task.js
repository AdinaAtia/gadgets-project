const mongoose = require("mongoose")
const stepSchema=require("../modles/schema/step")
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    important: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String]
    },
    type: {
        type: String,
    },
    icon: {
        type: String,
    },
    range:{
        type:Number,
        min:0,
        max:5
    },
    location: {
        city: String,
        street: String,
        building: Number
    },
    status: {
        type: String,
        enum: ["Assigned", "In Process", "Completed", "Closed"],
        default: "Assigned"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    steps: [stepSchema],
},
    {
        timestamps: true
    })
module.exports = mongoose.model("Task", taskSchema)