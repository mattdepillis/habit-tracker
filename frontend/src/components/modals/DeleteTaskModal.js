import React, { useState } from 'react'
import styled from 'styled-components'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { TrashButton, DeleteButton, CancelButton } from '../Buttons'
import { deleteTask } from '../../utils/api'

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const DeleteTaskModal = ({
  taskId,
  taskName,
  taskStatus,
  setLoading
}) => {
  const [submitting, setSubmitting] = useState(false)

  const placement = taskStatus === 'Complete'
    ? 'left'
    : 'right'

  const processDeleteTask = async (taskId) => {
    setSubmitting(true)
    await deleteTask(taskId)
    setLoading(true)
    setSubmitting(false)
    document.body.click()
  }

  return (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement={placement}
      overlay={
        <Popover id="popover-basic">
          <Popover.Title as="h3">Delete Task</Popover.Title>
          <Popover.Content>
            Are you sure you&apos;d like to delete &quot;{taskName}&quot;?
            <ButtonWrapper>
              <CancelButton
                onClick={() => document.body.click()}
              />
              <DeleteButton
                submitting={submitting}
                onClick={() => processDeleteTask(taskId)}
              />
            </ButtonWrapper>
          </Popover.Content>
        </Popover>
      }
    >
      <TrashButton />
    </OverlayTrigger>
  )
}

export default DeleteTaskModal
