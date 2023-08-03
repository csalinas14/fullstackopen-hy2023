const { application } = require('express')
const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')

morgan.token('content', (request, response) => {
    
    if(request.method === 'POST'){
        console.log('works')
        return JSON.stringify(request.body)
    }
    return " "
    
}
)

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())



const date = new Date()

let persons = 
[
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
      "name": "Mar Poppendieck", 
      "number": "39-23-6423122"
    }
]

let persons_count = persons.length

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons_count} people</p>
                    <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if(persons.find(p => p.name === body.name)){
        return response.status(400).json({
            error: 'name is not unique'
        })
    }

    const person = {
        id: getRandomInt(10000),
        name: body.name,
        number: body.number
    }
    

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

