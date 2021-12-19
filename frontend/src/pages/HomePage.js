import React, { useState } from 'react'
import styled from 'styled-components'

import { AddButton, PropertiesButton } from '../components/Buttons'
import PageContent from '../containers/PageContent'
import BoardContainer from '../containers/BoardContainer'
import AddTaskModal from '../components/AddTaskModal'
import ToastTab from '../components/ToastTab'
import FormQuestions from '../components/FormQuestions/FormQuestions'

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  position: relative;
  width: fit-content;
  max-height: 50px;
  margin: 10px 0 10px 0;
  z-index: 2;
`

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: fit-content;
  max-height: 50px;
  align-items: center;
  padding: 3px;
`

const ToastWrapper = styled.div`
  position: relative;
  padding-top: 5px;
  width: fit-content;
`

const BoardContainerWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`

const PropertyToast = styled(ToastTab)`
  position: relative;
  float: right;
`

/*
  TODO: get the properties of a task from FormQuestions and make a toggle button for each
*/
const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const setModalDisplay = () => setShowModal(!showModal)
  const setToastDisplay = () => setShowToast(!showToast)

  const properties = FormQuestions.map(q => { return { id: q.id, label: q.label } })

  return (
    <PageContent>
      <BoardContainerWrapper>
        <MenuWrapper>
          <ButtonWrapper>
            <AddButton
              onClick={setModalDisplay}
            />
            <PropertiesButton
              onClick={setToastDisplay}
            />
          </ButtonWrapper>
          <ToastWrapper>
            <PropertyToast
              show={showToast}
              onHide={setToastDisplay}
              properties={properties}
            />
          </ToastWrapper>
        </MenuWrapper>
        <BoardContainer
          showModal={showModal}
        />
      </BoardContainerWrapper>
      <AddTaskModal
        show={showModal}
        onHide={setModalDisplay}
      />
    </PageContent>
  )
}

export default HomePage