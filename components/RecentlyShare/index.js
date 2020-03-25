import React, { useState, useEffect } from 'react'
import { Tabs, List, Tag, Typography, Tooltip } from 'antd'
import { SwitchTagColor, SwitchTagName } from '../../utils/tags'
import Link from 'next/link'
import servicePath from '../../api'
import axios from 'axios'

const { TabPane } = Tabs

const { Paragraph } = Typography

const recentlyData = [
  {
    title: 'We supply a series of design principles, practical patterns and high quality design resources',
    type_id: '1'
  },
  {
    title: 'We supply a series of design principles, practical patterns and high quality design resources',
    type_id: '2'
  },
  {
    title: 'We supply a series of design principles, practical patterns and high quality design resources',
    type_id: '3'
  },
  {
    title: 'We supply a series of design principles, practical patterns and high quality design resources',
    type_id: '2'
  },
  {
    title: 'We supply a series of design principles, practical patterns and high quality design resources',
    type_id: '1'
  }
]



const RecentlyShare = () => {
  const [recentList, setRecentList] = useState([])
  const [hotList, setHotList] = useState([])

  useEffect(() => {
    axios.get(servicePath.getRecentArticleList)
      .then(res => {
        setRecentList(res.data.data)
      })
    axios.get(servicePath.getHotArticleList)
      .then(res => {
        setHotList(res.data.data)
      })
  }, [])

  return (
    <div className="layout-right-container">
      <Tabs>
        <TabPane tab="最近更新" key="1">
          <List
            dataSource={recentList}
            renderItem={item => (
              <Tooltip title={item.title}>
                <List.Item>
                  <Link href={{ pathname: '/list/type', query: { id: item.type_id } }}><a><Tag color={SwitchTagColor(item.type_id)}>{SwitchTagName(item.type_id)}</Tag></a></Link>
                  <Link href={{ pathname: '/list/detail', query: { id: item.id } }}>
                    <a>
                      <Paragraph
                        ellipsis
                        style={{ marginBottom: 0 }}
                      >{item.title}</Paragraph>
                    </a>
                  </Link>
                </List.Item>
              </Tooltip>
            )}
          />
        </TabPane>
        <TabPane tab="最多阅读" key="2">
          <List
            dataSource={hotList}
            renderItem={item => (
              <Tooltip title={item.title}>
                <List.Item>
                  <Link href={{ pathname: '/list/type', query: { id: item.type_id } }}><a><Tag color={SwitchTagColor(item.type_id)}>{SwitchTagName(item.type_id)}</Tag></a></Link>
                  <Link href={{ pathname: '/list/detail', query: { id: item.id } }}>
                    <a>
                      <Paragraph
                        ellipsis
                        style={{ marginBottom: 0 }}
                      >{item.title}</Paragraph>
                    </a>
                  </Link>
                </List.Item>
              </Tooltip>
            )}
          />
        </TabPane>
        <TabPane tab="收藏" key="3">
          暂无收藏
        </TabPane>
      </Tabs>
    </div>
  )
}

export default RecentlyShare