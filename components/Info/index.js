import React from 'react'
import { Avatar, Tag, Tooltip } from 'antd'
import { WechatOutlined, QqOutlined, GithubOutlined, StockOutlined, ContactsFilled } from '@ant-design/icons'
import MyTitle from '../IconTitle'
import './index.less'

const Info = () => {
  return (
    <div className="author-container  layout-right-container">
      <div className="author-avatar">
        <Avatar
          size={100}
          src="/static/logo.jpg"
        />
      </div>
      <div className="author-introduction">
        <div className="author-name">Blue</div>
        <div className="author-desc">练习时长两年半</div>
        <MyTitle icon={StockOutlined} text="Skills"></MyTitle>
        <div className="author-label">
          <Tag color="#f50">Javascript</Tag>
          <Tag color="#108ee9">React</Tag>
          <Tag color="#87d068">Vue</Tag>
        </div>
        <MyTitle icon={ContactsFilled} text="Account"></MyTitle>
        <div className="author-account">
          <Tooltip placement="top" title="623904853">
            <Avatar size={28} icon={<QqOutlined twoToneColor="" />} />
          </Tooltip>
          <Tooltip placement="top" title="l17737465753">
            <Avatar size={28} icon={<WechatOutlined twoToneColor="" />} />
          </Tooltip>
          <Tooltip placement="top" title="https://github.com/creatUsername">
            <Avatar size={28} icon={<GithubOutlined twoToneColor="" />} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Info