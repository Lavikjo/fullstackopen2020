import React from 'react'

const DeleteButton = ({onClick}) => {
  return (
    <button onClick={() => onClick()}>Delete</button>
  )
}

export default DeleteButton