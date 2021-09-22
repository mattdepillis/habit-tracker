import FormQuestions from '../components/FormQuestions/FormQuestions'

const options = (method, body) => {
  switch (method) {
    case 'POST':
      return {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(body)
      }
    case 'GET':
      return {
        method: 'GET',
        headers: { 'Content-Type':'application/json' }
      }
  }
}

export const fetchData = async (path) => {
  return fetch(`${process.env.BACKEND_URL}${path}`, options('GET'))
    .then(response => response.json())
}

export const getSelectOptions = async (callback, path, table) => {
  const data = await fetchData(path)
    const formattedData = []
    data.map(option => {
      formattedData.push({
        value: option[`${table}_name`],
        label: option[`${table}_name`],
        color: option.label_color
      })
    })
    callback(formattedData)
    return formattedData
}

export const postData = async (path, body) => {
  fetch(`${process.env.BACKEND_URL}${path}`, options('POST', body))
    .then(response => response.json())
}

export const postTask = async (body) => {
  const task = { ...body }
  const junctionItems = []
  const questions = [...FormQuestions]

  // TODO: make this a separate utils.js function for separating out non-task-table properties
  Object.keys(task).forEach(key => {
    if (Array.isArray(task[`${key}`])) {
      const obj = {}
      const q = questions.find(item => item.id === key)
      obj[`${q.path}`] = task[`${key}`]
      junctionItems.push(obj)
      delete task[`${key}`]
    }
  })

  // TODO: post the task and fetch the id back from the backend
  // TODO: find a good way to structure the data for sending to the junction table controllers + processing into table entries

  console.log('task', task)
  console.log('junctionItems', junctionItems)
}

// post each junction table element to junction table