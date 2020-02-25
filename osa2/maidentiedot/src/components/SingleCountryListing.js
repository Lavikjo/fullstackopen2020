import React from "react"
import Weather from "./Weather"

const SingleCountryListing = ({ country }) => {
  if (!country) return null
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <img src={country.flag} style={{ width: "150px" }} alt="flag" />

      <Weather country={country}/>
    </div>
  )
}

export default SingleCountryListing
