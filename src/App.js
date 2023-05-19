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
import { Button, Space, Tooltip,Spin,Alert } from 'antd';
import { Input } from 'antd';
import { Card, Col, Row } from 'antd';
import { Image } from 'antd';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue,get,child} from "firebase/database";
import {dbService, database} from './firebase';

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

  const [articles,setArticles]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [page,setPage]=useState(1);
  
  const getArticles=async ()=>{  
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'data')).then((snapshot) => {
      if (snapshot.exists()) {
        let data=snapshot.val().slice((page-1)*20,(page)*20)
        console.log(data)
        setArticles(data)
        setIsLoading(true)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(()=>{
    getArticles()
  },[])
  useEffect(()=>{
    console.log(page)
    getArticles()
  },[page])
  

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
            {
              articles.map((elem,index)=>{
                return(
                <Col key={index} xs={{span: 24}} lg={{span: 6}}>
                  <Card title={isLoading&&articles[index]['platform']} bordered={false} style={{border:"1px solid #eee",margin:"5% 0 5% 0"}}>  
                      {isLoading
                      ?
                      <Image  width={200} height={200} src={`https://storage.googleapis.com/experience-gen.appspot.com/${articles[index]['platform']}_${articles[index]['title']}.png`} style={{objectFit:'cover',borderRadius:"100%"}}/>
                      :
                      <Spin tip="Loading" size="large"></Spin>
                      }
                      {/* <Image  width={200} height={200} src={`https://storage.googleapis.com/experience-gen.appspot.com/${articles[0]['platform']}_${articles[0]['title']}.png`} style={{objectFit:'cover',borderRadius:"100%"}}/> */}
                      {isLoading&&<p style={{marginTop:"15%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{articles[index]['title']}</p>
                      }       
                    {/* <p>{isLoading?<Spin tip="Loading" size="large"></Spin>:<div>Bye</div>}</p> */}
                  </Card>
                </Col>
                )
                
              })
            }
          </Row>
        </Space>
        
        </div>



      </Content>
      <Space direction='horizontal' size='middle' style={{display:'flex',justifyContent:'center',margin:"1%"}}> 
        <Pagination style={{ textAlign: 'center' }} onChange={(e)=>{setPage(e);console.log(page)}} defaultCurrent={1} total={500} showSizeChanger={false}/>
      </Space>
      
      <Footer style={{ textAlign: 'center' }}> 체험단시대 ©2023 Created by AURAWORKS</Footer>

    </Layout>
  );
};

export default App;