import React from "react"

const CountryListing = ({ countries }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  )
}

export default CountryListing
