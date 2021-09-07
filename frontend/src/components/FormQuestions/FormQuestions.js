const FormQuestions = [
  {
    id: 'taskName',
    label: 'Name',
    type: 'text'
  },
  {
    id: 'taskDescription',
    label: 'Description',
    type: 'textarea'
  },
  {
    id: 'taskDeadline',
    label: 'Deadline',
    type: 'date'
  },
  {
    id: 'taskStatus',
    label: 'Status',
    type: 'singleSelect',
    path: '/status',
    table: 'status'
  },
  {
    id: 'taskPriority',
    label: 'Priority',
    type: 'singleSelect',
    path: '/priority',
    table: 'priority'
  },
  {
    id: 'taskType',
    label: 'Type',
    type: 'singleSelect',
    path: '/type',
    table: 'type'
  },
  {
    id: 'taskTags',
    label: 'Tags',
    type: 'multiSelect',
    path: '/tag',
    table: 'tag'
  },
  {
    id: 'taskEngineers',
    label: 'Engineers',
    type: 'multiSelect',
    path: '/engineer',
    table: 'engineer'
  },
  {
    id: 'taskProductManager',
    label: 'Product Manager',
    type: 'singleSelect',
    path: '/product-manager',
    table: 'product_manager'
  },
]

export default FormQuestions
