import { Card, Spin, Button, Form, Comment, Tooltip, List, Avatar, Tag, Input } from 'antd'
import Marked from 'marked'
import hljs from 'highlight.js'
import '../../static/styles/highlight.less'
import { useState } from 'react'
import servicePath from '../../api'
import Axios from 'axios'
import moment from 'moment'
import { withRouter } from 'next/router'

const DetailMessage = (props) => {
  const { message, updateList, router: { query: { id } } } = props

  const [commentInfo, setCommentInfo] = useState({ Nickname: '', comment: '' })
  const [isLoading, setIsLoading] = useState(false)

  Marked.setOptions({
    renderer: new Marked.Renderer(),
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

  const onFinish = values => {
    const time = moment().unix()
    setIsLoading(true)
    Axios({
      method: 'post',
      url: servicePath.addCommentById,
      data: {
        nickname: values.Nickname,
        content: values.comment,
        addTime: time,
        article_id: id
      }
    }).then(res => {
      if (res.data.data) {
        updateList()
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <Spin spinning={isLoading}>
      <Card title="发表评论" id="comment-form">
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            label="昵称"
            name="Nickname"
            rules={[
              { required: true, message: '昵称为必填项' },
              { min: 1, max: 13, message: '长度1~13位' },
            ]}
          >
            <Input
              placeholder="请输入昵称"
              value={commentInfo.Nickname}
            />
          </Form.Item>

          <Form.Item
            label="评论"
            name="comment"
            rules={[{ required: true, message: '评论内容不能为空' }]}
          >
            <Input.TextArea
              placeholder="请输入评论内容"
              value={commentInfo.comment}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </Card>
      </Spin>
      <List
        className="comment-list"
        header={<h2>评论列表</h2>}
        bordered
        itemLayout="horizontal"
        dataSource={message}
        renderItem={item => (
          <div>
            <Comment
              avatar={<Avatar style={{ backgroundColor: '#' + (parseInt(item.nickname, 16) || '1890ff') }}>{item.nickname}</Avatar>}
              author={(
                <span>{item.nickname} {item.nickname === 'blue' && <Tag color="green">作者</Tag>}</span>
              )}
              content={(
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              )}
              datetime={<Tooltip title={moment(item.addTime*1000).format('YYYY-MM-DD HH:mm:ss')}><span>{moment(item.addTime*1000).fromNow()}</span></Tooltip>}
            />
          </div>
        )}
      />
    </>
  )
}

export default withRouter(DetailMessage)
