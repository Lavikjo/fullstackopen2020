import React from 'react'
import DeleteButton from './DeleteButton'

const Person = ({name, number, onHandleDelete}) => {
  return (
    <li>{name} {number} <DeleteButton  onClick={onHandleDelete}/></li> 
  )
}

export default Person