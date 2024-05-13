const mongoose = require('mongoose')

const MemorySchema = new mongoose.Schema({
    memory: String,
    description: String,
    date: Date
})

const MemoryModel = mongoose.model("memories", MemorySchema)

module.exports = MemoryModel;