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
import logo2 from './pictures/logo2.png'
import logo from './pictures/logo.png'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip,Spin,Alert,Select,Badge,Dropdown, message } from 'antd';
import { Input } from 'antd';
import { Card, Col, Row } from 'antd';
import { Image } from 'antd';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue,get,child} from "firebase/database";
import {dbService, database} from './firebase';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

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
  const [keyword,setKeyword]=useState("")
  const [originArticles,setOriginArticles]=useState([])
  const [changedData,setChangedData]=useState([])
  const [filterStatus,setFilterStatus]=useState("이름순")
  const [source,setSource]=useState("전체")

  
  const getArticles=async ()=>{  
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'data')).then((snapshot) => {
      if (snapshot.exists()) {
        let data=snapshot.val().slice((page-1)*20,(page)*20)
        let originData=snapshot.val()
        setArticles(data)
        setOriginArticles(originData)
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
    if (keyword.length){
      console.log("CASE1")
      setArticles(changedData.slice((page-1)*20,(page)*20))
    } else{
      console.log("CASE2")
      setArticles(originArticles.slice((page-1)*20,(page)*20))
    }
  },[page])


  
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    let filteredData = originArticles.filter((item) =>
      item['title'].includes(keyword)
    );

    if (source!=="전체"){
      // console.log("아닌데?")
      filteredData = filteredData.filter((item) =>
      item['platform'].includes(source)
    );

    }
    
    
    // console.log(filteredData); // 필터링된 결과를 콘솔에 출력하거나 다른 작업을 수행합니다.
    setChangedData(filteredData)

    const partialFilteredData=filteredData.slice((page-1)*20,(page)*20)
    console.log("filteredData:",filteredData)

    setArticles(partialFilteredData)
    if (keyword.length==0){
      getArticles()
    }
  };

  const sortedData = ()=>{
    let newArticles=changedData.sort((a, b) => {
      // 기준이 되는 속성 값을 비교하여 정렬
      if (a.applyCount < b.applyCount) return -1; // a.name이 b.name보다 작으면 a를 앞으로 정렬
      if (a.applyCount > b.applyCount) return 1; // a.name이 b.name보다 크면 b를 앞으로 정렬
      return 0; // a.name과 b.name이 같으면 순서 유지
    });
    setArticles(newArticles)
    console.log("정렬완료")
  }
  
  const sortApplyUp=()=>{
    let sortedData = changedData.sort((a, b) => {
      // 기준이 되는 속성 값을 비교하여 정렬
      if (parseInt(a['applyCount']) < parseInt(b['applyCount'])) return -1; // a.name이 b.name보다 작으면 a를 앞으로 정렬
      if (parseInt(a['applyCount']) > parseInt(b['applyCount'])) return 1; // a.name이 b.name보다 크면 b를 앞으로 정렬
      return 0; // a.name과 b.name이 같으면 순서 유지
    });
    let newData=sortedData.slice((page-1)*20,(page)*20)
    setArticles(newData)
  }

  const sortApplyDown=()=>{
    let sortedData = changedData.sort((a, b) => {
      // 기준이 되는 속성 값을 비교하여 정렬
      if (parseInt(a['applyCount']) > parseInt(b['applyCount'])) return -1; // a.name이 b.name보다 작으면 a를 앞으로 정렬
      if (parseInt(a['applyCount']) < parseInt(b['applyCount'])) return 1; // a.name이 b.name보다 크면 b를 앞으로 정렬
      return 0; // a.name과 b.name이 같으면 순서 유지
    });
    let newData=sortedData.slice((page-1)*20,(page)*20)
    setArticles(newData)
  }
  const sortDemandUp=()=>{
    let sortedData = changedData.sort((a, b) => {
      // 기준이 되는 속성 값을 비교하여 정렬
      if (parseInt(a['demandCount']) < parseInt(b['demandCount'])) return -1; // a.name이 b.name보다 작으면 a를 앞으로 정렬
      if (parseInt(a['demandCount']) > parseInt(b['demandCount'])) return 1; // a.name이 b.name보다 크면 b를 앞으로 정렬
      return 0; // a.name과 b.name이 같으면 순서 유지
    });
    let newData=sortedData.slice((page-1)*20,(page)*20)
    setArticles(newData)
  }

  const sortDemandDown=()=>{
    let sortedData = changedData.sort((a, b) => {
      // 기준이 되는 속성 값을 비교하여 정렬
      if (parseInt(a['demandCount']) > parseInt(b['demandCount'])) return -1; // a.name이 b.name보다 작으면 a를 앞으로 정렬
      if (parseInt(a['demandCount']) < parseInt(b['demandCount'])) return 1; // a.name이 b.name보다 크면 b를 앞으로 정렬
      return 0; // a.name과 b.name이 같으면 순서 유지
    });
    let newData=sortedData.slice((page-1)*20,(page)*20)
    setArticles(newData)
  }

  const sortDdayUp=()=>{
    let sortedData = changedData.sort((a, b) => {
      // 기준이 되는 속성 값을 비교하여 정렬
      if (parseInt(a['dday']) < parseInt(b['dday'])) return -1; // a.name이 b.name보다 작으면 a를 앞으로 정렬
      if (parseInt(a['dday']) > parseInt(b['dday'])) return 1; // a.name이 b.name보다 크면 b를 앞으로 정렬
      return 0; // a.name과 b.name이 같으면 순서 유지
    });
    let newData=sortedData.slice((page-1)*20,(page)*20)
    setArticles(newData)
  }

  const sortDdayDown=()=>{
    let sortedData = changedData.sort((a, b) => {
      // 기준이 되는 속성 값을 비교하여 정렬
      if (parseInt(a['dday']) > parseInt(b['dday'])) return -1; // a.name이 b.name보다 작으면 a를 앞으로 정렬
      if (parseInt(a['dday']) < parseInt(b['dday'])) return 1; // a.name이 b.name보다 크면 b를 앞으로 정렬
      return 0; // a.name과 b.name이 같으면 순서 유지
    });
    let newData=sortedData.slice((page-1)*20,(page)*20)
    setArticles(newData)
  }

  const sortTitle=()=>{
    getArticles();
  }
  
  const handleChangeRegion = (value) => {
    // console.log(`selected ${value}`);
  };
  
  const handleChangePlatform = (value) => {
    // console.log(`selected ${value}`);
    setSource(value)
  };

  const handleClick=(e)=>{
    e.preventDefault();
    let text=e.target.textContent.replace("#","")
    console.log(text);
    setKeyword(text)
    
  }

  const buttonNames=["배송","제품","인천","부산",'대구','경남','강남','대전','충청','수원','강원','광주','제주','숙박','홍대','부천','화성','성남','시흥','광주','울산','경남','남양주','용인','평택','용산','포항','강서구','경북','서구','파주']

  console.log(keyword)
  return (
    <Layout style={{backgroundColor:"#eee"}}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%',display:'flex',margin:0,padding:"0 3% 0 0",height:"5rem"}}>
        <Image  preview={false} width={300} height={50} src={logo2} style={{objectFit:'cover',justifyContent:"left",alignItems:'center',marginTop:"2%"}}/>
        {/* <div style={{color:"#eee",fontSize:'2rem',width:"50%",padding:"0 2% 0 2%"}}>체험단시대</div> */}
        
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
      {/* <Button onClick={sortTest}>111</Button> */}



      <Content className="site-layout" style={{ padding: '3%',height:"100%"}}>
        
        <div style={{minHeight: 500, background: colorBgContainer,textAlign:'center',justifyContent:'center',alignItems:'center',backgroundColor:"#eee"}}>
          <h2>
            다양한 체험단을 확인해보세요
          </h2>
        <Space className="searchBar" size="middle" style={{ display: 'flex',margin:"20px",justifyContent:'center',justifyContent:'center'}}>
          {/* <Space direction='horizontal'>
            <div style={{display:"flex"}}>지역</div>
            <Select
              className='optionRegion'
              defaultValue="전체"
              onChange={handleChangeRegion}
              options={[
                {
                  value: '전체',
                  label: '전체',
                },
                {
                  value: '서울',
                  label: '서울',
                },
                {
                  value: '경기/인천',
                  label: '경기/인천',
                },
                {
                  value: '대전/충청',
                  label: '대전/충청',
                },
                {
                  value: '대구/경북',
                  label: '대구/경북',
                },
                {
                  value: '부산/경남',
                  label: '부산/경남',
                },
                {
                  value: '광주/전라',
                  label: '광주/전라',
                },
                {
                  value: '기타',
                  label: '기타',
                },
              ]}
            />     
            </Space> */}
          <Space direction='horizontal'>
          <div>출처</div>
          <Select 
            className='optionPlatform'
            defaultValue="전체"
            onChange={handleChangePlatform}
            options={[
              {
                value: '전체',
                label: '전체',
              },
              {
                value: '강남맛집',
                label: '강남맛집',
              },
              {
                value: '놀러와체험단',
                label: '놀러와체험단',
              },
              {
                value: '디너의여왕',
                label: '디너의여왕',
              },
              {
                value: '데일리뷰',
                label: '데일리뷰',
              },
            ]}
          />
          </Space>
          <Space>
            <Input placeholder="검색어를 입력하세요" type="text" value={keyword} onChange={handleInputChange} style={{width:"100%",minWidth:"100%",textAlign:"center"}}/>
            <Button type="primary" icon={<SearchOutlined />} onClick={()=>{
              handleSearch();
              setPage(1);
            }}>
              검색
            </Button>
          </Space>       
        </Space>
        
        
        
          
        
        
          <Space wrap style={{padding:3, display:"flex",justifyContent:"center"}}>
            {
              buttonNames.map((elem,index)=>{
                
                return (
                  <Button key={index} value={elem} onClick={handleClick} type='primary'>#{elem}</Button> 
                )
              })

            }
            {/* <Button type="primary">
              #카페
            </Button>
            <Button type="primary">
              #삼겹살
            </Button>
            <Button type="primary">
              #뷰티
            </Button>
            <Button type="primary">
              #헤어
            </Button>
            <Button type="primary">
              #분식
            </Button>
            <Button type="primary">
              #테니스
            </Button>
            <Button type="primary">
              #골프
            </Button> */}
          </Space>
        
        

        
        
        <Space align='end' style={{display:'flex',justifyContent:"flex-end"}}>
          <Select
            defaultValue="기본"
            style={{
              width: 120,
              margin:"10% 0 10% 0"
            }}
            onChange={(e)=>{
              if(e==="지원 적은순"){
                sortApplyUp();
              }else if(e==="지원 많은순"){
                sortApplyDown();
              }else if(e==="모집 적은순"){
                sortDemandUp();
              }else if(e==="모집 많은순"){
                sortDemandDown();
              }else if(e==="기한 적은순"){
                sortDdayUp();
              }else if(e==="기한 많은순"){
                sortDdayDown();
              }else{
                sortTitle();
              }
            }}
            options={[
              {
                value: '기본',
                label: '기본',
              },
              {
                value: '기한 많은순',
                label: '기한 많은순',
              },
              {
                value: '기한 적은순',
                label: '기한 적은순',
              },
              {
                value: '지원 많은순',
                label: '지원 많은순',
              },
              {
                value: '지원 적은순',
                label: '지원 적은순',
              },
              {
                value: '모집 많은순',
                label: '모집 많은순',
              },
              {
                value: '모집 적은순',
                label: '모집 적은순',
              },
            ]}
          />
        </Space>
        
        <Space direction="vertical" size="middle" style={{ display: 'flex',justifyContent:'center','alignItems':'center' }}>
          <Row gutter={16}>
            {
              articles.map((elem,index)=>{
                
                let partition=articles[index]['title'].indexOf(']');
                let titleFront=articles[index]['title'].slice(0,partition+1);
                let titleRr=articles[index]['title'].slice(partition+1,partition.length);
                
                return(
                <Col key={index} xs={{span: 12}} lg={{span: 6}} style={{padding:"1%",alignItems:'center'}}>
                  <Badge.Ribbon text={`D-${elem['dday']}`} count={10} size="default" style={{}}>
                  <Card title={isLoading&&articles[index]['platform']} bordered={false} style={{padding:"0",border:"1px solid #eee",overflow:'hidden',width:"100%",height:"100%"}} headStyle={{fontSize:"1.5rem"}}>  
                      {isLoading
                      ?
                      <a target='_blank' href={elem['url']}><Image width={100} height={100} preview={false} src={`https://storage.googleapis.com/experience-gen.appspot.com/${articles[index]['myImage']}.png`} style={{objectFit:'contain',borderRadius:"100%"}}/></a>
                      :
                      <Spin tip="Loading" size="large"></Spin>
                      }
                      {/* <Image  width={200} height={200} src={`https://storage.googleapis.com/experience-gen.appspot.com/${articles[index]['myImage']}.png`} style={{objectFit:'cover',borderRadius:"100%"}}/> */}
                      {isLoading&&
                      <>
                        <Space style={{display:"flex",flexDirection:"column"}}>
                          <Space style={{flex:"1fr"}}>
                            <p style={{display:"block", marginTop:"30%"}}>{titleFront}</p>
                          </Space>
                          <Space style={{width:"1fr"}}>
                            <p>{titleRr}</p>
                          </Space>
                          
                        </Space>
                      
                      </>
                      }       
                    {/* <p>{isLoading?<Spin tip="Loading" size="large"></Spin>:<div>Bye</div>}</p> */}
                    <Space style={{display:"flex",justifyContent:"center"}}>
                      <Badge count={isLoading ? `지원 ${elem['applyCount']}` : 0} showZero color='#faad14' style={{width:"100%",fontSize:"1rem"}} />
                      <Badge count={isLoading ? `모집 ${elem['demandCount']}` : 0} style={{width:"100%",fontSize:"1rem"}}/>
                    </Space>
                    
                  </Card>
                  </Badge.Ribbon>
                  
                </Col>
                )
                
              })
            }
          </Row>
        </Space>
        
        </div>



      </Content>
      <Space direction='horizontal' size='middle' style={{display:'flex',justifyContent:'center',margin:"1%"}}> 
        <Pagination style={{ textAlign: 'center' }} onChange={(e)=>{setPage(e)}} current={page} defaultCurrent={1} total={keyword?parseInt(changedData.length/2):parseInt(originArticles.length/2)}  showSizeChanger={false}/>
      </Space>
      
      <Footer style={{ textAlign: 'center' }}> 체험단시대 ©2023 Created by AURAWORKS</Footer>

    </Layout>
  );
};

export default App;