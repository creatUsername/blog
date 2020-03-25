import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Row, Col, List, Avatar, BackTop, Affix, Tag } from 'antd'
import Link from 'next/link'
import { LikeOutlined, EyeOutlined } from '@ant-design/icons'
import { MyHeader, IconText, Info, RecentlyShare } from '../../components'
import MyLayout from '../../layouts/index'
import Axios from 'axios'
import servicePath from '../../api'
import { SwitchTagName, SwitchTagColor } from '../../utils/tags'
import { withRouter } from 'next/router'
import Marked from 'marked'
import hljs from 'highlight.js'
import '../../static/styles/highlight.less'

const MyListType = (props) => {
  const { router: { query: { id } } } = props
  const [articleList, setArticleList] = useState([])
  const [typeList, setTypeList] = useState([])

  useEffect(() => {
    getArticleListByTypeId(id)
    getTypeList(id)
  }, [id])

  const getArticleListByTypeId = id => {
    Axios.get(servicePath.getArticleListByTypeId + id).then(res => {
      setArticleList(() => res.data.data)
    })
  }

  const getTypeList = id => {
    Axios.get(servicePath.getTypeInfo)
      .then(res => {
        setTypeList(res.data.data.filter(x => x.Id != id))
      })
  }

  const renderer = new Marked.Renderer()

  Marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,

    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  })

  return (
    <>
      <Head>
        <title>List - Blog</title>
      </Head>
      <BackTop visibilityHeight="200" />
      <MyHeader />
      <MyLayout>
        <Row
          justify="center"
        >
          <Col
            xs={24}
            sm={24}
            md={16}
            lg={18}
            xl={16}
            className="comm-left"
          >
            <List
              dataSource={articleList}
              itemLayout="vertical"
              size="large"
              header={(
                <div>
                  <span style={{ marginRight: 8 }}>当前</span>
                  <Tag color={SwitchTagColor(id)}>{SwitchTagName(id)}</Tag>
                  <span style={{ marginRight: 8 }}>其他标签</span>
                  <Link href={{ pathname: '/list' }}><a><Tag color="cyan">默认</Tag></a></Link>
                  {
                    typeList.map(item => (
                      <Link key={item.Id} href={{ pathname: '/list/type', query: { id: item.Id } }}>
                        <a>
                          <Tag color={SwitchTagColor(item.Id)}>{item.typeName}</Tag>
                        </a>
                      </Link>
                    ))
                  }
                </div>
              )}
              pagination={{
                onChange: page => console.log(page),
                pageSize: 5
              }}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={
                    [
                      <IconText icon={LikeOutlined} text={item.like} key="list-vertical-star-o" />,
                      <IconText icon={EyeOutlined} text={item.view_count} key="list-vertical-watched" />,
                    ]
                  }
                  extra={
                    <img
                      width={260}
                      className="comm-left-list-img"
                      alt={item.title}
                      src={item.imgUrl || 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                    title={<Link href={{ pathname: '/list/detail', query: { id: item.Id } }}><a>{item.title}</a></Link>}
                    description={<Link href={{ pathname: '/list/type', query: { id: item.type_id } }}><a><Tag color={SwitchTagColor(item.type_id)}>{SwitchTagName(item.type_id)}</Tag></a></Link>}
                  />
                  <div dangerouslySetInnerHTML={{__html: Marked(item.introduce)}}></div>
                </List.Item>
              )}
            >
            </List>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={7}
            lg={5}
            xl={5}
            className="comm-right"
          >
            <Info />
            <Affix>
              <RecentlyShare />
            </Affix>
          </Col>
        </Row>
      </MyLayout>
    </>
  )
}

export default withRouter(MyListType)