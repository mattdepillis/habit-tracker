import React, { useState, useEffect } from 'react'
import Creatable from 'react-select/creatable'

import { formatPostData } from '../../utils/utils'
import { getSelectOptions, postData } from '../../utils/api'
import { multiSelectOptionColors } from './SelectQuestionStyles'

// TODO: refactor getSelectOptions and put in api.js
// TODO: refactor the form out into more components
// TODO: organize src/components

const MultiSelectQuestion = ({ id, path, table }) => {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    getSelectOptions(setOptions, path, table)
  }, [])

  return (
    <Creatable
      id={id}
      isMulti
      isClearable
      value={selected}
      options={options}
      styles={multiSelectOptionColors}
      onChange={(value) => {
        setSelected(value)
      }}
      onCreateOption={async (value) => {
        const formattedData = formatPostData(value, `${table}_name`)
        await postData(path, formattedData)
        const newOptions = await getSelectOptions(setOptions, path, table)
        const newOption = newOptions.find(option => option.label === value)
        setSelected([...selected, newOption])
      }}
    />
  )
}

export default MultiSelectQuestion
