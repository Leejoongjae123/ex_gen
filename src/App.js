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
import logo from './pictures/logo.png'
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
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%',display:'flex',margin:0,padding:"0 3% 0 3%"}}>
      
      
        <Image  preview={false} width={50} height={50} src={logo} style={{objectFit:'cover',borderRadius:"100%",justifyContent:"left",alignItems:'center'}}/>
        <div style={{color:"#eee",fontSize:'2rem',width:"50%",padding:"0 2% 0 2%"}}>체험단시대</div>
        
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




      <Content className="site-layout" style={{ padding: '5%',height:"100%"}}>
        
        <div style={{minHeight: 500, background: colorBgContainer,textAlign:'center',justifyContent:'center',alignItems:'center',backgroundColor:"#eee"}}>
          <h1>
            다양한 체험단을 확인해보세요
          </h1>
        <Space direction="vertical" size="middle" style={{ display: 'flex',margin:"20px",justifyContent:'center'}}>
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
          <Space wrap style={{padding:5,display:'flex',justifyContent:'center'}}>
            <Input placeholder="검색어를 입력하세요" />
            <Button type="primary" icon={<SearchOutlined />}>
              검색
            </Button>
          </Space>
        </Space>

        
        
        
        <Space direction="vertical" size="middle" style={{ display: 'flex',justifyContent:'center','alignItems':'center' }}>
          <Row gutter={16}>
            <Col xs={{span: 24}} lg={{span: 6}}>
              <Card title="자장면" bordered={false} style={{border:"1px solid #eee",margin:"5% 0 5% 0"}}>
                <Image  width={200} height={200} src={picture1} style={{objectFit:'cover',borderRadius:"100%"}}/>
                <p>맛있어요 한번 잡솨봐</p>
              </Card>
            </Col>
            <Col xs={{span: 24}} lg={{span: 6}}>
              <Card title="샐러드" bordered={false} style={{border:"1px solid #eee",margin:"5% 0 5% 0"}}>
                <Image  width={200} height={200} src={picture2} style={{objectFit:'cover',borderRadius:"100%"}} />
                <p>너무 싱싱해요 한번 잡솨봐</p>
              </Card>
            </Col>
            <Col xs={{span: 24}} lg={{span: 6}}>
              <Card title="스파게티" bordered={false} style={{border:"1px solid #eee",margin:"5% 0 5% 0"}}>
                <Image  width={200} height={200} src={picture3} style={{objectFit:'cover',borderRadius:"100%"}} />
                <p>새우가 탱글해요 한번 잡솨봐</p>
              </Card>
            </Col>
            <Col xs={{span: 24}} lg={{span: 6}}>
              <Card title="소갈비" bordered={false} style={{border:"1px solid #eee",margin:"5% 0 5% 0"}}>
                <Image  width={200} height={200} src={picture4} style={{objectFit:'cover',borderRadius:"100%"}} />
                <p>아주 기름져요 한번 잡솨봐</p>
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