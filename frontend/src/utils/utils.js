// generates random colors for form question options
const generateRandomColor = () => {
  let c = "#";
  for (let i = 0; i < 3; i++) {
    c += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2)
  }
  return c
}

// formats new select question options on creation before posting to db
export const formatPostData = (value, table) => {
  const obj = {}
  const color = generateRandomColor()
  obj.label_color = color
  obj[`${table}`] = value
  return obj
}

// handles changes in question values for top-level parent form
export const handleChange = (setAnswer, id, value) => {
  const obj = {}

  // formats question value for the parent form depending on question type
  obj[`${id}`] = typeof value === 'object'
    ? Array.isArray(value)
      ? value.map(item => item.value)
      : (value === null ? null : value.value)
    : value

  setAnswer({ ...obj })
}

// check to see if an empty answer (ex. '', Array[0]) should be removed from answers object
export const cleanFormAnswers = (answer, obj) => {
  const key = Object.keys(answer)[0]
  
  /* checks whether value of answer is empty/null. 
  Ternary separates checks into array vs non-array */
  const emptyValue = Array.isArray(answer[`${key}`])
    ? (answer[`${key}`].length === 0)
    : (answer[`${key}`] === '' || answer[`${key}`] === null)
  
  if (emptyValue) delete obj[`${key}`]
  else obj[`${key}`] = answer[`${key}`]

  return obj
}

/*
  places the values for each task property into an array of objects to be converted into colored badges
  on the TaskCardCovers.
*/
export const createPropertyArray = (task, property) => {
  let propertyArray = []
  
  if (property === 'engineers' || property === 'tags') {
    const propertySingular = property.substring(0, property.length - 1)

    task[`task_${property}`].forEach(obj => {
      propertyArray.push({
        name: obj[`${propertySingular}_name`],
        color: obj[`${propertySingular}_label_color`]
      })
    })
  } else {
    let value = task[`task_${property}`]
    if (property === 'deadline') {
      value = new Date(task[`task_${property}`])
        .toLocaleString('en', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
    }

    propertyArray = [{
      name: value,
      color: task[`${property}_label_color`]
    }]
  }

  return propertyArray
}

export const generateTaskOrder = (array) =>
  array.map(item => item.task_id)
