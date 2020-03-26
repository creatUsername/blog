import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import Router, { withRouter } from 'next/router'
import './index.less'

const menus = [
  {
    title: '首页',
    path: '/'
  },
  {
    title: '文章列表',
    path: '/list'
  },
  {
    title: '关于我',
    path: '/about'
  }
]

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: false,
      defaultSelectedKeys: '/',
      selectedKeys: [this.props.router.pathname.split('/').slice(0, 2).join('/')]
    }

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect({ keyPath, key }) {
    this.setState({
      selectedKeys: keyPath
    }, () => {
      Router.push(key)
    })
  }

  render() {
    const { defaultSelectedKeys, selectedKeys } = this.state
    return (
      <div className="header">
        <Row>
          <Col
            xs={4}
            className="logo"
          >LOGO</Col>
          <Col
            xs={20}
          >
            <Menu
              mode="horizontal"
              className="menu"
              theme="dark"
              defaultSelectedKeys={[defaultSelectedKeys]}
              selectedKeys={selectedKeys}
              onClick={this.onSelect}
            >
              {
                menus.map(menu => {
                  return (
                    <Menu.Item
                      key={menu.path}
                      title={menu.title}
                    >{menu.title}</Menu.Item>
                  )
                })
              }
            </Menu>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Header)
