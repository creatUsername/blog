import Head from 'next/head'
import Link from 'next/link'
import { BackTop, Row, Col, Breadcrumb, Tag, Affix, Tooltip, message } from 'antd'
import { MyHeader, IconTitle, RecentlyShare, IconText, Tocify } from '../../components'
import { StarTwoTone, BookOutlined, LikeTwoTone, EyeOutlined, UserOutlined, LikeOutlined } from '@ant-design/icons'
import MyLayout from '../../layouts'
import { SwitchTagColor, SwitchTagName } from '../../utils/tags'
import Marked from 'marked'
import hljs from 'highlight.js'
import '../../static/styles/highlight.less'
import Axios from 'axios'
import servicePath from '../../api'

const Detail = ({ data }) => {
  const { article_content, view_count, liked } = data
  const tocify = new Tocify()
  const renderer = new Marked.Renderer()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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

  }); 
  
  const markdown = Marked(article_content)

  const addLike = () => {
    Axios.get(servicePath.addLike + data.id)
      .then(res => {
        message.success('感谢您的支持!我会继续努力的...')
      })
  }

  return (
    <>
      <Head>
        <title>{data.title} - Blog</title>
      </Head>
      <BackTop visibilityHeight="200" />
      <MyHeader />
      <MyLayout>
        <Row
          justify="center"
        >
          <Col
            xs={0}
            sm={0}
            md={0}
            lg={1}
            xl={2}
          >
            <Affix>
              <div className="comm-contrl-group">
                <Tooltip title="觉得不错点个赞吧">
                  <LikeTwoTone onClick={() => addLike()} twoToneColor="#F56C6C" />
                </Tooltip>
                <Tooltip title="点击收藏下次就不会找不到了">
                  <StarTwoTone twoToneColor="#E6A23C" />
                </Tooltip>
              </div>
            </Affix>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={16}
            lg={16}
            xl={16}
            className="comm-left"
          >
            <div>
              <div className="breadcrumb-div">
                <Breadcrumb separator="-">
                  <Breadcrumb.Item>
                    <Link href="/"><a>首页</a></Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link href="/list"><a>文章列表</a></Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {data.title}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="blog-head-group">
                <h1>{data.title}</h1>
                <div className="tag-list">
                  <Link href={{ pathname: '/list/type', query: { id: data.type_id } }}><a><Tag color={SwitchTagColor(data.type_id)}>{SwitchTagName(data.type_id)}</Tag></a></Link>
                </div>
                <div className="icon-list">
                  <IconText icon={UserOutlined} text={'Blue'} />
                  <IconText icon={LikeOutlined} text={liked} />
                  <IconText icon={EyeOutlined} text={view_count} />
                </div>
              </div>
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{__html: markdown}}
              ></div>
            </div>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={7}
            lg={5}
            xl={5}
            className="comm-right"
          >
            <Affix>
              <div>
                <div className="layout-right-container">
                  <IconTitle icon={BookOutlined} text={'目录'} />
                  <div
                    className="article-menu"
                  >
                    { tocify && tocify.render() }
                  </div>
                </div>
                <RecentlyShare />
              </div>
            </Affix>
          </Col>
        </Row>
      </MyLayout>
    </>
  )
}

Detail.getInitialProps = async (context) => {
  const { query: { id } } = context
  const promise = new Promise(resolve => {
    Axios.get(servicePath.getArticleById + id)
      .then(res => {
        resolve(res.data.data[0])
      })
  })

  return {
    data: await promise
  }
}

export default Detail