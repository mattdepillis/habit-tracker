import React, { useState } from 'react'

import { AddButton, PropertiesButton } from '../components/Buttons'
import PageContent from '../containers/PageContent'
import BoardContainer from '../containers/BoardContainer'
import AddTaskModal from '../components/modals/AddTaskModal'
import FormQuestions from '../components/FormQuestions/FormQuestions'
import {
  MenuWrapper, ButtonWrapper, ToastWrapper, BoardContainerWrapper, PropertyToast
} from '../styles/HomePage'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showProperties, setShowProperties] = useState(['Status', 'Tags'])

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
              showProperties={showProperties}
              setShowProperties={setShowProperties}
            />
          </ToastWrapper>
        </MenuWrapper>
        <BoardContainer
          showModal={showModal}
          showProperties={showProperties}
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