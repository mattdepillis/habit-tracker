const generateRandomColor = () => {
  let c = "#";
  for (let i = 0; i < 3; i++) {
    c += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2)
  }
  return c
}

export const formatPostData = (value, path) => {
  const obj = {}
  const color = generateRandomColor()
  obj.label_color = color
  obj[`${path}`] = value
  return obj
}