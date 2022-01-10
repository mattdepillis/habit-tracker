import React from 'react'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { TrashButton } from '../Buttons'

const DeleteTaskModal = ({
  taskName,
  taskStatus
}) => {
  const placement = taskStatus === 'Complete'
    ? 'left'
    : 'right'

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
          </Popover.Content>
        </Popover>
      }
    >
      <TrashButton />
    </OverlayTrigger>
  )
}

export default DeleteTaskModal
