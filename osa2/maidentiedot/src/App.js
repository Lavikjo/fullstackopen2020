import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import FilterResults from "./components/FilterResults"
import axios from "axios"

function App() {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState({})

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <Filter value={newFilter} onChange={filter => setNewFilter(filter)} />
      <FilterResults countries={countries} filter={newFilter} />
    </div>
  )
}

export default App
