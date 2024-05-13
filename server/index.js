const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const MemoryModel = require('./Models/Memory')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud');

app.get('/', (req, res) => {
    MemoryModel.find()
    .then(memories => res.json(memories))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    MemoryModel.create(req.body)
    .then(memory => res.json(memory))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    MemoryModel.findByIdAndUpdate({_id: id}, {
        memory: req.body.memory,
        description: req.body.description,
        date: req.body.date
    }).then(memory => res.json(memory))
    .catch(err => res.json(err))
})

app.delete('/deleteMemory/:id', (req, res) => {
    const id = req.params.id;
    MemoryModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running");
})