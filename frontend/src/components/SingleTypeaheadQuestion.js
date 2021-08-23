import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { fetchData, postData } from '../utils/api'
import { formatPostData } from '../utils/utils'
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
  }, [typeaheadOptions, selected])

  useEffect(() => {
    const shouldPost = (
      selected.length > 0 &&
      typeaheadOptions.indexOf(selected[0]?.label) < 0 &&
      selected[0]?.label?.length > 0
    )
    if (shouldPost) {
      const body = formatPostData(selected[0].label, `${table}_name`)
      postData(path, body)
    }
    getTypeaheadOptions()
  }, [selected])

  return (
    <Typeahead
      allowNew
      clearButton
      id={id}
      options={typeaheadOptions.map(option => option[`${table}_name`])}
      newSelectionPrefix='Create '
      selected={selected}
      placeholder={placeholder}
      onChange={(value) => {
        if (value[0]?.customOption) {
          formatPostData(value[0]?.label, `${table}_name`)
        }
        setSelected(value)
      }}
      renderInput={(
        { inputRef, referenceElementRef, ...inputProps }
      ) => (
        <Form.Control
          {...inputProps}
          ref={element => {
            inputRef(element)
            referenceElementRef(element)
          }}
          style={{
            color: selected.length > 0
            ? `${optionColors[`${selected}`]}`
            : 'black'
          }}
        >
        </Form.Control>
      )}
    />
  )
}

export default SingleTypeaheadQuestion