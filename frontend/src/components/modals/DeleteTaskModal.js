import React from 'react'

import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { TrashButton } from '../Buttons'

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here is some <strong>amazing</strong> content. It is very engaging.
      right?
    </Popover.Content>
  </Popover>
)

const DeleteTaskModal = () => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      overlay={popover}
    >
      <TrashButton />
    </OverlayTrigger>
  )
}

export default DeleteTaskModal
