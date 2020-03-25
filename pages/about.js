import Head from 'next/head'
import { MyHeader } from '../components'
import MyLayout from '../layouts'
import { Card, Row, Col, Divider, Progress } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { useState } from 'react'

export default () => {
  const [ jsNum, setJsNum ] = useState(60)
  const [ reactNum, setReactNum ] = useState(71)
  const [ vueNum, setVueNum ] = useState(66)

  const blogOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['Next.js', 'React-Hooks', 'ant-design', 'less']
    },
    series: [
      {
        name: '博客前台',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 355, name: 'Next.js' },
          { value: 226, name: 'React-Hooks' },
          { value: 245, name: 'ant-design' },
          { value: 135, name: 'less' },
        ]
      }
    ]
  }

  const adminOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['React', 'Node.js', 'egg.js', 'ant-design', 'less', 'marked', 'egg-mysql']
    },
    series: [
      {
        name: '博客前台',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 355, name: 'React' },
          { value: 260, name: 'Node.js' },
          { value: 426, name: 'egg.js' },
          { value: 226, name: 'ant-design' },
          { value: 155, name: 'less' },
          { value: 86, name: 'marked' },
          { value: 235, name: 'egg-mysql' },
        ]
      }
    ]
  }

  return (
    <>
      <Head>
        <title>关于我 - Blog</title>
      </Head>
      <MyHeader />
      <MyLayout>
        <Row gutter={10} className="about-container">
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
          >
            <Card
              title="关于博客"
            >
              <Divider>博客前端技术栈</Divider>
              <ReactEcharts
                option={blogOption}
              />
              <Divider>博客后端技术栈</Divider>
              <ReactEcharts
                option={adminOption}
              />
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
          >
            <Card
              title="关于我"
            >
              <div className="about-box">
                <div className="img-wrap">
                  <img className="about-avatar" src="/static/logo.jpg" alt="" />
                </div>
                <h2 className="card-title">About Me</h2>
                <div className="card-member"></div>
                <Row
                  className="about-info"
                  gutter={10}
                >
                  <Col
                    xs={24}
                    sm={12}
                  >
                    <span className="about-info-l">Name:</span>李靖
                  </Col>
                  <Col
                    xs={24}
                    sm={12}
                  >
                    <span className="about-info-l">Email:</span>623904853@qq.com
                  </Col>
                  <Col
                    xs={24}
                    sm={12}
                  >
                    <span className="about-info-l">Phone:</span>156 4956 2016
                  </Col>
                  <Col
                    xs={24}
                    sm={12}
                  >
                    <span className="about-info-l">Like:</span>很多
                  </Col>
                  <Col
                    xs={24}
                    sm={12}
                  >
                    <span className="about-info-l">Address:</span>客居深圳
                  </Col>
                </Row>
                <div className="about-introduce">
                  <Divider>SKILL</Divider>
                  <Row
                    className="skill-group"
                  >
                    <Col
                      xs={ { span: 20, offset: 2 } }
                      sm={ { span: 8, offset: 0 } }
                    >
                      <Progress type="circle" percent={reactNum} />
                      <h3>React</h3>
                    </Col>
                    <Col
                      xs={ { span: 20, offset: 2 } }
                      sm={ { span: 8, offset: 0 } }
                    >
                      <Progress type="circle" strokeColor="#017E66" percent={vueNum} />
                      <h3>Vue</h3>
                    </Col>
                    <Col
                      xs={ { span: 20, offset: 2 } }
                      sm={ { span: 8, offset: 0 } }
                    >
                      <Progress type="circle" strokeColor="#f5222d" percent={jsNum} />
                      <h3>Javascript</h3>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </MyLayout>
    </>
  )
}
