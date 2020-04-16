import React from "react"
import { setFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filter = event.target.value
    props.setFilter(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { setFilter }
export default connect(null, mapDispatchToProps)(Filter)