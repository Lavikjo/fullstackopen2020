import React from "react"

const Filter = ({ value, onChange }) => {
  return (
    <div>
        Find countries: 
        <input value={value} onChange={e =>onChange(e.target.value)} />
    </div>
  )
}

export default Filter
