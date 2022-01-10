// a single function for setting fetch options. 
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
    case 'PUT':
      return {
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(body)
      }
  }
}

// fetches data from the db from table specified by the path.
export const fetchData = async (path) => 
  fetch(`${process.env.BACKEND_URL}${path}`, options('GET'))
    .then(response => response.json())

// gets options for select questions.
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

// posts an object to the db using the specified path to determine the proper table.
export const postData = async (path, body) =>
  fetch(`${process.env.BACKEND_URL}${path}`, options('POST', body))
    .then(response => response)

// updates an item in the db.
export const updateItem = async (path, id, body) =>
  fetch(`${process.env.BACKEND_URL}${path}/${id}`, options('PUT', body))
    .then(response => response)

// deletes the task in the db.
// TODO: should take a path and id -- API route has already been written for this function
export const deleteTask = async () =>
  console.log('this will delete the task in the future!')
