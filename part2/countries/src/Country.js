const Search = ({txt, hsC}) => {

    return(
        <div>
            find countries <input
        value={txt}
        onChange={hsC}
              />
        </div>
    )
}

const SingleCountry = ({country, showCountryClick}) => {

  return(

  <div>
    {country.name.common} {' '}
    <button onClick={showCountryClick}>show</button>
  </div>
  )
}

const Language = ({language}) => <li>{language}</li>

const DisplaySingleCountry = ({oneCountry, weather}) => {

  console.log(weather)
  //console.log(api_key)
  //console.log(oneCountry.capital[0])

  //const weatherData = weather(oneCountry.capital[0], api_key)
  //console.log(weatherData)

  return(
    <div>
          <h1>{oneCountry.name.common}</h1>
          <br></br>
          capital {oneCountry.capital[0]}
          <br></br>
          area {oneCountry.area}
          <br></br>
          <b>languages:</b>
          
          <ul>
            {Object.entries(oneCountry.languages).map(([key, value]) => <Language key={key} language={value}/>)}
          </ul>

          <img src={oneCountry.flags.png} alt={oneCountry.flags.alt}/>

          <h2>Weather in {oneCountry.capital[0]}</h2>

          <p>temperature {weather.main.temp} Celcius</p>

          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />

          <p>wind {weather.wind.speed} m/s</p>

        </div>
      )
  
}

const Country = ({text, handleSearchChange, countries, filtertext, showOne, handleShowOneChange, showOneCountry, weather}) =>{


    if(showOne){
      console.log('showOne')
      return(
        <div>
          <Search txt={text} hsC={handleSearchChange}/>
          <DisplaySingleCountry oneCountry={showOneCountry} weather={weather}/>
        </div>
        )
    }

    else{
      const countriesToShow = filtertext === ''
      ? []
      : countries.filter(c => c.name.common.toLowerCase().includes(filtertext.toLowerCase()))

      const numOfCountries = countriesToShow.length

      /** 

      if(numOfCountries === 1){

        const oneCountry = countriesToShow[0]
  
        console.log(oneCountry.languages)
        
        
        return(
          <div>
            <Search txt={text} hsC={handleSearchChange}/>
            <DisplaySingleCountry oneCountry={oneCountry} weather={weatherService} api_key={api}/>
          </div>
        )
      }
      */
    
      if(numOfCountries <= 10 && numOfCountries !== 1){
      
      return(
        <div>
          <Search txt={text} hsC={handleSearchChange}/>
          
          {countriesToShow.map(c => <SingleCountry key={c.name.common} country={c} showCountryClick={() => handleShowOneChange(c)}/>)}
        </div>
      )
      }
      else if(numOfCountries > 10){
        return(
          <div>
          <Search txt={text} hsC={handleSearchChange}/>
          <p>Too many matches, specify another filter</p>
          </div>
        )
      }

    }


    
  }


export default Country