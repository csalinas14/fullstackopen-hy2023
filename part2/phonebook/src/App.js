import { useState } from 'react'

const Person = ({person}) => <div>{person.name} {person.number}</div>

const Filter = ({text, handleSearchChange}) =>
    <div>
        filter shown with <input
        value={text}
        onChange={handleSearchChange}
              />
      </div>


const PersonForm = ({addName, forms}) => {

  return(
    <form onSubmit={addName}>
      <h2>Add a new</h2>
      {forms.map(form => <SingleForm key={form.text} text={form.text} newText={form.value} changeFunc={form.change}/>)}
      <div>
          <button type="submit">add</button>
      </div>
    </form>
  )
}

const SingleForm = ({text, newText, changeFunc}) => {

  return(
    <div>
        {text} <input
        value={newText}
        onChange={changeFunc}
        />
    </div>
  )
}

const Persons = ({personsArr, filterText}) => {
  const personsToShow = filterText === ''
    ? personsArr
    : personsArr.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
  
  return(
    <div>
        {personsToShow.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}


const App = () => {

  //application' states
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '000-000-0000' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState('')

  //event handlers

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const noDuplicateNames = persons.every(x => x.name !== newName)
    const noDuplicateNumbers = persons.every(x => x.number !== newNumber)

    console.log(noDuplicateNames)

    if (!noDuplicateNames){
      alert(`${newName} is already added to phonebook`)
    }
    else if (!noDuplicateNumbers) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  //object to map input forms
  const personFormObject = [
    {
      text : 'name:',
      value : newName,
      change : handlePersonChange
    },
    {
      text : 'number:',
      value : newNumber,
      change : handleNumberChange
    }
  ]

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter text={newSearch} handleSearchChange={handleSearchChange}/>

      <PersonForm addName={addName} forms={personFormObject} />
      
      <h2>Numbers</h2>
  
      <Persons personsArr={persons} filterText={newSearch}/>
    </div>
  )
}

export default App

