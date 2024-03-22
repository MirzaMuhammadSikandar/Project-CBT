const mongoose = require('mongoose')
const user = require('./user.js')

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['todo', 'inprogress', 'pending', 'done'],
        // enum to define a set of constants
        required: true
    },

    date: { type: String, required: true, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "model" }
})

const task = mongoose.model('tasks', taskSchema);

module.exports = task;