require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Note = require('./models/person');
const {
    default: mongoose
} = require('mongoose');


const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

morgan.token('body', res => {
    return JSON.stringify(res.body)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

app.get('/id/persons', (req, res) => {
    Note.find({}).then((data) => res.json(data))
})

app.post('/id/persons', (req, res) => {
    const note = new Note({
        name: req.body.name,
        number: req.body.number,
    })

    note.save().then((data) => res.json(data));
})



// Mongoose