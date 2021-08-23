export const fetchData = async (path) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type':'application/json' }
  }

  return fetch(`${process.env.BACKEND_URL}${path}`, options)
    .then(response => response.json())
}

export const postData = async (path, body) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  }

  fetch(`${process.env.BACKEND_URL}${path}`, options)
    .then(response => response.json())
}