import React from 'react'
import TaskModal from './TaskModal'

const AddTaskModal = ({
  show,
  onHide,
  setLoading
}) => (
  <TaskModal
    show={show}
    setLoading={setLoading}
    onHide={onHide}
  />
)

export default AddTaskModal
