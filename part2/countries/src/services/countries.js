import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (city, api_key) => {
    const request = axios.get(`${weatherUrl}${city}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default {getAll, getWeather}

