import React from 'react'
import './index.less'

const MyTitle = ({ icon, text }) => (
  <>
    <div className="my-title">
      {React.createElement(icon)}
      <span className="my-text">{text}</span>
    </div>
  </>
)

export default MyTitle