const FormQuestions = [
  {
    id: 'task_name',
    label: 'Name',
    type: 'text'
  },
  {
    id: 'task_description',
    label: 'Description',
    type: 'textarea'
  },
  {
    id: 'task_deadline',
    label: 'Deadline',
    type: 'date'
  },
  {
    id: 'task_status',
    label: 'Status',
    type: 'singleSelect',
    path: '/status',
    table: 'status'
  },
  {
    id: 'task_priority',
    label: 'Priority',
    type: 'singleSelect',
    path: '/priority',
    table: 'priority'
  },
  {
    id: 'task_type',
    label: 'Type',
    type: 'singleSelect',
    path: '/type',
    table: 'type'
  },
  {
    id: 'task_tags',
    label: 'Tags',
    type: 'multiSelect',
    path: '/tag',
    table: 'tag'
  },
  {
    id: 'task_engineers',
    label: 'Engineers',
    type: 'multiSelect',
    path: '/engineer',
    table: 'engineer'
  },
  {
    id: 'task_product_manager',
    label: 'Product Manager',
    type: 'singleSelect',
    path: '/product-manager',
    table: 'product_manager'
  },
]

export default FormQuestions
