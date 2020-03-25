export const SwitchTagColor = (type) => {
  if (typeof type !== 'string') {
    type = type + ''
  }
  switch (type) {
    case '1':
      return '#108ee9'
    case '2':
      return '#87d068'
    case '3':
      return '#f50'
    case '4':
      return '#E6A23C'
    default:
      return 'green'
  }
}

export const SwitchTagName = (type) => {
  if (typeof type !== 'string') {
    type = type + ''
  }
  switch (type) {
    case '1':
      return 'React'
    case '2':
      return 'Vue'
    case '3':
      return 'Javascript'
    case '4':
      return 'Css'
    default:
      return '其他'
  }
}