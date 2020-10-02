const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

let Todo = new mongoose.Schema({
    name: {
        type: String
    },
    priority: {
        type: String,
        enum: ["1","2","3"]
    },
    completed: {
        type: String,
        default:"No"
    },
    createdby:{
        type: ObjectId,
        ref: "User"
    },
    archived:{
        type: String,
        default: "No",
        enum: ["Yes", "No"]
    },
    attachment:{
        type: String
    }

});

module.exports = mongoose.model('Todo', Todo);