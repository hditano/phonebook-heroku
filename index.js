const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');



app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

morgan.token('body', res => {
    return JSON.stringify(res.body)
  })

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]




app.get('/', (request, response) => {
    response.send('Hello Hernan!!')
})

app.get('/api/persons', (request, response) => {
    response.json(data)
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = data.find(ele => ele.id === id);

    if(person) {
        response.json(person);
    } else {
        response.status(404).end();
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = data.find(ele => ele.id !== id);

    response.status(204).end();
})

app.get('/info', (request, response) => {
    let getDate = new Date(Date.now());

    const responseInfo = `Phonebook has info for ${data.length} people ${getDate}`;

    response.send(responseInfo)
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    const getduplicated = data.filter(ele => ele.name === body.name)


    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    if(getduplicated) {
        return response.status(400).json({
            error: 'name is duplicated'
        })
    }

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number,
    }

    data = data.concat(person);

    response.json(person);
})



const generateID = () => {
    const maxID = data.length > 0 ? Math.max(...data.map(ele => ele.id)) : 0;
    return maxID + 1; 
}



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})