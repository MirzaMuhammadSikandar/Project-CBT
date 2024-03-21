const mongoose = require('mongoose')
const user = require('./user.js')

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "model" }
})

const task = mongoose.model('tasks', taskSchema);

module.exports = task;