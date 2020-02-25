import React, { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ country }) => {
  const [weatherdata, setWeatherdata] = useState({})

  useEffect(() => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=" +
          process.env.REACT_APP_WEATHER_API_KEY +
          "&query=" +
          country.name
      )
      .then(response => setWeatherdata(response.data))
  }, [country])
  if (Object.keys(weatherdata).length === 0) return <div>Loading weather data...</div>
  else
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>
          <b>Temperature: </b>
          {weatherdata.current.temperature} Celsius
        </p>
        <img
          src={weatherdata.current.weather_icons[0]}
          style={{ width: "100px" }}
          alt="weathericon"
        />
        <p>
          <b>Wind: </b> {weatherdata.current.wind_speed} kph direction{" "}
          {weatherdata.current.wind_dir}
        </p>
      </div>
    )
}

export default Weather
