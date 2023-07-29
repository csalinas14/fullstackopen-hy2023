import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({person, deleteEvent}) => {

  return(
    <div>
      {person.name} {person.number} {' '}
      <button onClick={deleteEvent}>delete</button>
      </div>
  )
}

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

const Persons = ({personsArr, filterText, deletePerson}) => {
  const personsToShow = filterText === ''
    ? personsArr
    : personsArr.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  
  return(
    <div>
        {personsToShow.map(person => <Person key={person.name} person={person} deleteEvent={() => deletePerson(person)}/>)}
    </div>
  )
}

const Notification = ({message, type}) => {
  if (message === null){
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}


const App = () => {

  //application' states
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  //event handlers

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const noDuplicateNames = persons.every(x => x.name !== newName)
    const noDuplicateNumbers = persons.every(x => x.number !== newNumber)

    console.log(noDuplicateNames)

    if (!noDuplicateNames){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        console.log('Changed')
        const person = persons.find(n => n.name === newName)
        const changedPerson = {...person, number: newNumber}
        console.log(changedPerson.id)
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`Changed ${changedPerson.name}'s number to ${changedPerson.number}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${changedPerson.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== changedPerson.id))
        })
      }
    }
    else if (!noDuplicateNumbers) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setSuccessMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })

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

  const deletePerson = (person) => {
    console.log(person)
    if(window.confirm(`Delete ${person.name}?`)){
        console.log('Deleted')
        
        personService
          .deleteEntry(person)
          .then(response =>
          personService.getAll()
        ).then(initialPersons => {
          console.log('promise fulfilled')
          setPersons(initialPersons)
        })
    }
    
}

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} type={'success'}/>
      <Notification message={errorMessage} type={'error'}/>
      
      <Filter text={newSearch} handleSearchChange={handleSearchChange}/>

      <PersonForm addName={addName} forms={personFormObject} />
      
      <h2>Numbers</h2>
  
      <Persons personsArr={persons} filterText={newSearch} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

