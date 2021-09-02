import chroma from 'chroma-js'

export const singleSelectOptionColors = {
  option: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: data.color
  })
}

export const multiSelectOptionColors = {
  option: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  multiValue: (styles, { data }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  })
}
