import { useState } from 'react';
import { DiaryFormProps, ValidationError } from '../types';
import { createDiary } from '../services/diaryService';
import axios from 'axios';

const DiaryForm = (props: DiaryFormProps) => {

  const [dateInput, setDateInput] = useState('')
  const [visibilityInput, setVisibilityInput] = useState('')
  const [weatherInput, setWeatherInput] = useState('')
  const [commentInput, setCommentInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
        date: dateInput,
        visibility: visibilityInput,
        weather: weatherInput,
        comment: commentInput,
        
    }

    try{
        const data = await createDiary(diaryToAdd)
        props.setDiariesFunc(props.diaries.concat(data))
 
   }catch(error){
      if(axios.isAxiosError<ValidationError, Record<string, unknown>>(error)){
        console.log(error.response)
        setErrorMessage(error.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 10000)
      }
      console.log(error)
   }

    setDateInput('')
    setVisibilityInput('')
    setWeatherInput('')
    setCommentInput('')
  }
  console.log(errorMessage)
  return(
    <form onSubmit={diaryCreation}>
      <h1>Add new entry</h1>
      {errorMessage && <p> {errorMessage}</p>}
      <label >date</label> 
      <input type="date" value={dateInput} onChange={(event) => setDateInput(event.target.value)}></input><br />

      
        visibility
        <input name="visibility" type="radio" id="visibility" value={visibilityInput} onChange={() => setVisibilityInput('great')}></input>
        <label htmlFor="visibility">great</label>
        <input name="visibility" type="radio" id="visibility" value={visibilityInput} onChange={() => setVisibilityInput('good')}></input>
        <label htmlFor="visibility">good</label>
        <input name="visibility" type="radio" id="visibility" value={visibilityInput} onChange={() => setVisibilityInput('ok')}></input>
        <label htmlFor="visibility">ok</label>
        <input name="visibility" type="radio" id="visibility" value={visibilityInput} onChange={() => setVisibilityInput('poor')}></input>
        <label htmlFor="visibility">poor</label>

        <br />
        weather
        <input name="weather" type="radio" id="weather" value={weatherInput} onChange={() => setWeatherInput('sunny')}></input>
        <label htmlFor="weather">sunny</label>
        <input name="weather" type="radio" id="weather" value={weatherInput} onChange={() => setWeatherInput('rainy')}></input>
        <label htmlFor="weather">rainy</label>
        <input name="weather" type="radio" id="weather" value={weatherInput} onChange={() => setWeatherInput('cloudy')}></input>
        <label htmlFor="weather">cloudy</label>
        <input name="weather" type="radio" id="weather" value={weatherInput} onChange={() => setWeatherInput('stormy')}></input>
        <label htmlFor="weather">stormy</label>
        <input name="weather" type="radio" id="weather" value={weatherInput} onChange={() => setWeatherInput('windy')}></input>
        <label htmlFor="weather">windy</label>

        <br />
        comment
        <input value={commentInput} onChange={(event) => setCommentInput(event.target.value)}></input>
        <button type='submit'>add</button>
    </form>
  )
}

export default DiaryForm