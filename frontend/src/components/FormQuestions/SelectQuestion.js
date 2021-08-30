import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { getSelectOptions } from '../../utils/api'
import { singleSelectOptionColors } from './SelectQuestionStyles'

// TODO: make the question creatable

const SelectQuestion = ({ id, path, table }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    getSelectOptions(setOptions, path, table)
  }, [])

  return (
    <Select
      id={id}
      options={options}
      styles={singleSelectOptionColors}
    />
  )
}

export default SelectQuestion