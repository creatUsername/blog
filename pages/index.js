import Head from 'next/head'
import { Row, Col } from 'antd'
import { MyHeader, IconText } from '../components'
import MyLayout from '../layouts'

const Home = () => (
  <>
    <Head>
      <title>Home - Blog</title>
    </Head>
    <MyHeader></MyHeader>
    <MyLayout>
      <Row
        justify="center"
      >
        <Col
          xs={24}
          sm={24}
          md={18}
          lg={18}
          xl={14}
          className="comm-left"
        >C</Col>
        <Col
          xs={0}
          sm={0}
          md={5}
          lg={5}
          xl={4}
          className="comm-right"
        >A</Col>
      </Row>
    </MyLayout>
  </>
)

export default Home