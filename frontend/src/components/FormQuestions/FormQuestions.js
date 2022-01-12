const FormQuestions = {
  taskName: {
    id: 'task_name',
    label: 'Name',
    type: 'text',
    section: 'nameAndDeadline'
  },
  taskDeadline: {
    id: 'task_deadline',
    label: 'Deadline',
    type: 'date',
    section: 'nameAndDeadline'
  },
  taskStatus: {
    id: 'task_status',
    label: 'Status',
    type: 'singleSelect',
    path: '/status',
    table: 'status',
    section: 'singleSelect'
  },
  taskPriority: {
    id: 'task_priority',
    label: 'Priority',
    type: 'singleSelect',
    path: '/priority',
    table: 'priority',
    section: 'singleSelect'
  },
  taskType: {
    id: 'task_type',
    label: 'Type',
    type: 'singleSelect',
    path: '/type',
    table: 'type',
    section: 'singleSelect'
  },
  taskProductManager: {
    id: 'task_product_manager',
    label: 'Product Manager',
    type: 'singleSelect',
    path: '/product-manager',
    table: 'product_manager',
    section: 'singleSelect'
  },
  taskEngineers: {
    id: 'task_engineers',
    label: 'Engineers',
    type: 'multiSelect',
    path: '/engineer',
    table: 'engineer',
    section: 'engineers'
  },
  taskTags: {
    id: 'task_tags',
    label: 'Tags',
    type: 'multiSelect',
    path: '/tag',
    table: 'tag',
    section: 'tags'
  },
  taskDescription: {
    id: 'task_description',
    label: 'Description',
    type: 'textarea',
    section: 'description'
  }
}

export default FormQuestions
