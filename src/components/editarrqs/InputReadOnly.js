import React from 'react'

const InputReadOnly = ({titulo, dato}) => {
  return (
    <>
        <label>
            {titulo}:
        </label>
            <input type="text" value={dato ? dato : ''} readOnly />
    </>
  )
}
export default InputReadOnly