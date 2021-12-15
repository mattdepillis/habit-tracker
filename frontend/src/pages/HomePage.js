import React, { useState } from 'react'
import styled from 'styled-components'

import { AddButton, PropertiesButton } from '../components/Buttons'
import PageContent from '../containers/PageContent'
import BoardContainer from '../containers/BoardContainer'
import AddTaskModal from '../components/AddTaskModal'

const ButtonWrapper = styled.div`
  display: flex;
`

/*
  TODO: make a React Boostrap Toast for the property toggle
  TODO: get the properties of a task from FormQuestions and make a toggle button for each
*/
const HomePage = () => {
  const [showModal, setShowModal] = useState(false)

  const setModalDisplay = () => showModal ? setShowModal(false) : setShowModal(true)

  return (
    <PageContent>
      <ButtonWrapper>
        <AddButton
          onClick={setModalDisplay}
        />
        <PropertiesButton
          onClick={() => console.log('clicked')}
        />
      </ButtonWrapper>
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