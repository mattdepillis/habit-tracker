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
  fetch(`${process.env.BACKEND_URL}/tasks`, options('POST', body))
    .then(response => response.json())
    .then(response => console.log(response))
}
