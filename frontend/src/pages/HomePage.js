import React, { useState } from 'react'
import styled from 'styled-components'

import PageContent from '../containers/PageContent'
import BoardContainer from '../containers/BoardContainer'
import AddButton from '../components/AddButton'
import AddTaskModal from '../components/AddTaskModal'

const Header = styled.h1`
  color: #343a40;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 2.25em;
`

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)

  const setModalDisplay = () => showModal ? setShowModal(false) : setShowModal(true)

  return (
    <PageContent>
      <Header>Your Kanban Board</Header>
      <AddButton onClick={setModalDisplay} />
      <BoardContainer />
      <AddTaskModal show={showModal} onHide={setModalDisplay} />
    </PageContent>
  )
}

export default HomePage