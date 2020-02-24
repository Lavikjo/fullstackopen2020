import React, { useState } from "react"
import SingleCountryListing from "./SingleCountryListing"

const CountryListing = ({ countries }) => {
  const [single, setSingle] = useState("")
  if (single) {
    return <SingleCountryListing country={single} />
  } else {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name}>
            {country.name}{" "}
            <button onClick={e => setSingle(country)}>show</button>
          </li>
        ))}
      </ul>
    )
  }
}

export default CountryListing
