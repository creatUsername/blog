import React from 'react'
import { Layout, Col, Row } from 'antd'

const MyLayout = props => (
  <Layout>
    <Row>
      <Col
        className="main-layout-wrapper"
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 24, offset: 0 }}
        md={{ span: 24, offset: 0 }}
        lg={{ span: 20, offset: 2 }}
        xl={{ span: 20, offset: 2 }}
      >
        { props.children }
      </Col>
    </Row>
    <style>{`
      .main-layout-wrapper {
        margin-top: .5rem;
      }
    `}</style>
  </Layout>
)

export default MyLayout