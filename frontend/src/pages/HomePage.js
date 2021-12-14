import React, { useState } from 'react'
import styled from 'styled-components'

import PageContent from '../containers/PageContent'
import BoardContainer from '../containers/BoardContainer'
import AddButton from '../components/AddButton'
import AddTaskModal from '../components/AddTaskModal'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)

  const setModalDisplay = () => showModal ? setShowModal(false) : setShowModal(true)

  return (
    <PageContent>
      <AddButton
        onClick={setModalDisplay}
      />
      <BoardContainer 
        showModal={showModal}
      />
      <AddTaskModal
        show={showModal}
        onHide={setModalDisplay}
      />
    </PageContent>
  )
}

export default HomePage