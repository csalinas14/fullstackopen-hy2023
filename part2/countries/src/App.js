import Country from './Country'
import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key)
  //application' states
  const [countries, setCountries] = useState([]) 

  const [newSearch, setNewSearch] = useState('')

  const [showOne, setShowOne] = useState(false)

  const [showOneCountry, setShowOneCountry] = useState(null)

  const [showWeather, setWeather] = useState(null)

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setShowOne(false)
  }

  const handleShowOneChange = (country) =>{
    console.log('Show One Clicked')
    setShowOne(true)
    setShowOneCountry(country)
  }

  useEffect(() => {
    console.log('effect')
    if(!showOne){
    countryService
      .getAll()
      .then(initialCountries => {
        console.log('promise fulfilled')
        setCountries(initialCountries)
      })
      .then(response => {
        const countriesToShow = newSearch === ''
        ? []
        : countries.filter(c => c.name.common.toLowerCase().includes(newSearch.toLowerCase()))
        
        if (countriesToShow.length === 1){
          console.log('here')
          setShowOne(true)
          setShowOneCountry(countriesToShow[0])
        }
      })
    }
    else{
      console.log('idk')
      countryService.getWeather(showOneCountry.capital[0], api_key)
      .then(weather => {
        //console.log(weather)
        setWeather(weather)
      })
    }
  }, [newSearch, showOne, showOneCountry])

  return(
    
    <Country text={newSearch} handleSearchChange={handleSearchChange} countries={countries} filtertext={newSearch} showOne={showOne} handleShowOneChange={handleShowOneChange} showOneCountry={showOneCountry}
      weather={showWeather}/>
    )
}

export default App