import React from 'react'
import { Result, Button } from 'antd';
import Link from 'next/link';
import { MyHeader } from '../components';
import MyLayout from '../layouts'
import Head from 'next/head'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { statusCode } = this.props
    return (
      <>
        <Head>
          <title>{statusCode} - Blog</title>
        </Head>
        <MyHeader />
        <MyLayout>
          <Result
            status={statusCode}
            title={statusCode}
            style={{ minHeight: 'calc(100vh - 80px)' }}
            subTitle="对不起,没有找到匹配页面,您可以"
            extra={<Link href="/"><a><Button type="primary">返回首页</Button></a></Link>}
          />
        </MyLayout>
      </>
    )
  }
}