import React, { useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'

import { formatPostData } from '../../utils/utils'
import { getSelectOptions, postData } from '../../utils/api'
import { singleSelectOptionColors } from './SelectQuestionStyles'
import { handleChange } from '../../utils/utils'

const SelectQuestion = ({
  id,
  path,
  table,
  setAnswer
}) => {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    getSelectOptions(setOptions, path, table)
  }, [])

  return (
    <Creatable
      isClearable
      id={id}
      options={options}
      value={selected}
      styles={singleSelectOptionColors}
      onChange={(value) => {
        setSelected(value)
        handleChange(setAnswer, id, value)
      }}
      onCreateOption={async (value) => {
        const formattedData = formatPostData(value, `${table}_name`)
        await postData(path, formattedData)
        const newOptions = await getSelectOptions(setOptions, path, table)
        const newOption = newOptions.find(option => option.label === value)
        setSelected(newOption)
      }}
    />
  )
}

export default SelectQuestion
