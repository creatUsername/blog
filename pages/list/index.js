import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Row, Col, List, Avatar, BackTop, Affix, Tag, Skeleton } from 'antd'
import Link from 'next/link'
import { LikeOutlined, EyeOutlined } from '@ant-design/icons'
import { MyHeader, IconText, Info, RecentlyShare } from '../../components'
import MyLayout from '../../layouts/index'
import Axios from 'axios'
import servicePath from '../../api'
import { SwitchTagColor, SwitchTagName } from '../../utils/tags'
import Marked from 'marked'
import hljs from 'highlight.js'
import '../../static/styles/highlight.less'

const MyList = () => {
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
      return hljs.highlightAuto(code).value
    }

  })

  useEffect(() => {
    getArticleList()
    getTypeList()
  }, [])

  const getArticleList = () => {
    setIsLoading(true)
    Axios.get(servicePath.getArticleList)
      .then(res => {
        setArticleList(res.data.data)
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getTypeList = () => {
    Axios.get(servicePath.getTypeInfo)
      .then(res => setTypeList(res.data.data))
  }

  const [ articleList, setArticleList ] = useState([])
  const [ typeList, setTypeList ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

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
                  <Tag color="cyan">默认</Tag>
                  <span style={{ marginRight: 8 }}>其他标签</span> 
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
                      <IconText icon={LikeOutlined} text={item.liked} key="list-vertical-star-o" />,
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
                  <Skeleton loading={isLoading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                      title={<Link href={{ pathname: '/list/detail', query: { id: item.id } }}><a>{item.title}</a></Link>}
                      description={<Link href={{ pathname: '/list/type', query: { id: item.type_id } }}><a><Tag color={SwitchTagColor(item.type_id)}>{SwitchTagName(item.type_id)}</Tag></a></Link>}
                    />
                    <div dangerouslySetInnerHTML={{__html: Marked(item.introduce)}}></div>
                  </Skeleton>
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

export default MyList