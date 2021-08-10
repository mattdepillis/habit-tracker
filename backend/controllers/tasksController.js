const getTasks = (req, res) => {
  res.send('This is my kanban board')
}

const postTask = (req, res) => {
  res.send(JSON.stringify({
    response: 'response'
  }))
}

module.exports = { getTasks, postTask }