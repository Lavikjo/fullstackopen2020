import React from "react"
import SingleCountryListing from "./SingleCountryListing"
import CountryListing from "./CountryListing"

const Filter = ({ countries, filter }) => {
    
    if (!filter) 
        return null
    const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (filtered.length > 10)
    {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (filtered.length === 1) {
        return (
            <SingleCountryListing country={filtered[0]}/>
        )
    } else {
        return (
            <CountryListing countries={filtered}/>
        )
        }
    }
  
  export default Filter
  