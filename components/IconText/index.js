import React from 'react'
import { Icon } from 'antd'

function IconText({ icon, text }) {
  return (
    <span>
      { React.createElement(icon, { style: { marginRight: 8 } }) }
      {text}
    </span>
  )
}

export default IconText
