const generateRandomColor = () => {
  let c = "#";
  for (let i = 0; i < 3; i++) {
    c += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2)
  }
  return c
}

export const formatPostData = (value, table) => {
  const obj = {}
  const color = generateRandomColor()
  obj.label_color = color
  obj[`${table}`] = value
  return obj
}

export const handleChange = (setAnswer, id, value) => {
  const obj = {}

  obj[`${id}`] = typeof value === 'object'
    ? Array.isArray(value)
      ? value.map(item => item.value)
      : value.value
    : value

  setAnswer({ ...obj })
}