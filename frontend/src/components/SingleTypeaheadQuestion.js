import React, { useEffect, useState } from 'react'
import { Typeahead, TypeaheadInputSingle, Token } from 'react-bootstrap-typeahead'
import { fetchData } from '../utils/api'
import 'react-bootstrap-typeahead/css/Typeahead.css'

const SingleTypeaheadQuestion = ({ id, path, placeholder, table }) => {

  const [selected, setSelected] = useState([])
  const [typeaheadOptions, setTypeaheadOptions] = useState([])
  const [optionColors, setOptionColors] = useState({})

  const getTypeaheadOptions = async () => {
    const data = await fetchData(path)
    setTypeaheadOptions(data)
  }

  useEffect(() => {
    getTypeaheadOptions()
  }, [])

  useEffect(() => {
    let colors = {}
    typeaheadOptions.forEach(option => {
      colors[`${option[`${table}_name`]}`] = option.label_color
    })
    setOptionColors({ ...colors })
  }, [typeaheadOptions])

  // TODO: either split Typeaheads into single and multi versions, or write ternary below

  return (
    <Typeahead
      id={id}
      options={typeaheadOptions.map(option => option[`${table}_name`])}
      selected={selected}
      placeholder={placeholder}
      onChange={setSelected}
      renderInput={(props) => {
        selected.map((option, i) => (
          <Token
            style={{
              backgroundColor : `${optionColors[option]}`,
              color: 'white'
            }}
            index={i}
            key={option}
            onRemove={props.onRemove}
            option={option}
          >
            {option}
          </Token>
        ))
      }}
    />
  )
}

export default SingleTypeaheadQuestion