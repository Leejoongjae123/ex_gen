import React from 'react';
import { Layout, theme } from 'antd';
import { Pagination } from 'antd';
import { Carousel } from 'antd';
import picture1 from './pictures/picture1.jpg'
import picture2 from './pictures/picture2.jpg'
import picture3 from './pictures/picture3.jpg'
import picture4 from './pictures/picture4.png'
import picture5 from './pictures/picture5.jpg'
import picture6 from './pictures/picture6.jpg'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { Input } from 'antd';
import { Card, Col, Row } from 'antd';
import { Image } from 'antd';
const { Header, Content, Footer } = Layout;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{backgroundColor:"#eee"}}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
        </div>
        <div style={{color:"#eee",fontSize:'1.5rem'}}>체험단시대</div>
        
      </Header>

      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>




      <Content className="site-layout" style={{ padding: '50px',height:"100%"}}>
        
        <div style={{padding: 24, minHeight: 500, background: colorBgContainer,textAlign:'center',justifyContent:'center',alignItems:'center',backgroundColor:"#eee"}}>
          <h1>
            다양한 체험단을 확인해보세요
          </h1>
        <Space direction="vertical" size="middle" style={{ display: 'flex',margin:"20px" }}>
          <Space wrap style={{padding:3}}>
            <Button type="primary">
              서울
            </Button>
            <Button type="primary">
              경기
            </Button>
            <Button type="primary">
              인천
            </Button>
            <Button type="primary">
              부산
            </Button>
          </Space>
          <Space wrap style={{padding:5}}>
            <Input placeholder="검색어를 입력하세요" />
            <Button type="primary" icon={<SearchOutlined />}>
              검색
            </Button>
          </Space>
        </Space>

        
        
        
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row gutter={16}>
            <Col md={{span: 24}} lg={{span: 6}}>
              <Card title="자장면" bordered={false} style={{border:"1px solid #eee"}}>
                <Image  width={200} height={200} src={picture1} style={{objectFit:'cover',borderRadius:"100%"}}/>
                <p>맛있어요 너무 좋아요</p>
              </Card>
            </Col>
            <Col md={{span: 24}} lg={{span: 6}}>
              <Card title="스파게티" bordered={false} style={{border:"1px solid #eee"}}>
                <Image  width={200} height={200} src={picture2} style={{objectFit:'cover',borderRadius:"100%"}} />
                <p>짜장면</p>
              </Card>
            </Col>
            <Col md={{span: 24}} lg={{span: 6}}>
              <Card title="누들" bordered={false} style={{border:"1px solid #eee"}}>
                <Image  width={200} height={200} src={picture3} style={{objectFit:'cover',borderRadius:"100%"}} />
                <p>짜장면</p>
              </Card>
            </Col>
            <Col md={{span: 24}} lg={{span: 6}}>
              <Card title="족발" bordered={false} style={{border:"1px solid #eee"}}>
                <Image  width={200} height={200} src={picture4} style={{objectFit:'cover',borderRadius:"100%"}} />
                <p>짜장면</p>
              </Card>
            </Col>
          </Row>
        </Space>
        
        </div>



      </Content>
      <Pagination style={{ textAlign: 'center' }} defaultCurrent={1} total={50} />
      <Footer style={{ textAlign: 'center' }}> 체험단시대 ©2023 Created by AURAWORKS</Footer>

    </Layout>
  );
};

export default App;