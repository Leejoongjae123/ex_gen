import React,{PureComponent} from 'react';
import logo2 from '../pictures/logo2.png';
import { Card, Col, Row,Image,Input,Button, Space, Spin,Alert,Select,Badge,Dropdown, message,Carousel,Pagination,Layout,theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect,useState,useCallback } from 'react';
import {addDoc,getDoc,collection, doc, getDocs,onSnapshot,orderBy,setDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue,get,child,limitToFirst,query} from "firebase/database";
import {dbService, database,authService} from '../firebase';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import banner1 from '../pictures/banner1.jpg';
import BarChartComp from './barchart'
import test from './test'
import CardLayout from './cardLayout';
import axios from 'axios';
import { debounce } from 'lodash';

const { Header, Content, Footer } = Layout;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [visitors, setVisitors] = useState([0,0,0,0,0]);
  const [isVisitors, setIsVisitors] = useState(false);
  const [articles,setArticles]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [keyword,setKeyword]=useState("")
  const [originArticles,setOriginArticles]=useState([])
  const [changedData,setChangedData]=useState([])
  const [filterStatus,setFilterStatus]=useState("이름순")
  const [source,setSource]=useState("")
  const [recentData,setRecentData]=useState([])
  const [sortBy,setSortBy]=useState("")
  const [sortOrder,setSortOrder]=useState("")
  


  const getArticles = async () => {
    try {
      const response = await axios.get('http://43.201.149.234/getProducts',
      {params: {
        platform: source,
        page:page,
        keyword:keyword,
        sortby:sortBy,
        sortorder:sortOrder,
      }});
      console.log('response:',response.data)
      setArticles(response.data)
      setIsLoading(true)
    
      
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
    
  };

  const getVisitors=async ()=>{  
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'visitors')).then((snapshot) => {
      if (snapshot.exists()) {
        let data=snapshot.val()
        setVisitors(data)
        setIsVisitors(true)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  //검색 조건을 가지고 기사를 다시 가져옴
  useEffect(()=>{
    getArticles();
  },[page,source,sortOrder,sortBy])

  useEffect(()=>{
    const debounce = setTimeout(() => {
      getArticles();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  },[keyword])

  //방문자를 처음에만 조회
  useEffect(()=>{
    getVisitors();
  },[])
  
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
    
  };




  const handleSearch = () => {
    getArticles();
  };


  

  console.log("keyword:",keyword)
  
  
  const handleChangePlatform = (value) => {
    // console.log(`selected ${value}`);
    if (value==="전체"){
      setSource("")
    } else{
      setSource(value)
    }
  };

  const handleClick=(e)=>{
    e.preventDefault();
    let text=e.target.textContent.replace("#","")
    console.log(text);
    setKeyword(text)
    
  }

  const buttonNames=["배송","제품","인천","부산",'대구','경남','강남','대전','충청','수원','강원','광주','제주','숙박','홍대','부천','화성','성남','시흥','광주','울산','경남','남양주','용인','평택','용산','포항','강서구','경북','서구','파주']

  // console.log(keyword,keyword.length)
  const navigate=useNavigate()
  const onLogOutClick=()=>{
    authService.signOut();
    navigate("/")
  }
  

  return (
    <Layout style={{backgroundColor:"#eee"}}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: "100%",display:'flex',margin:0,padding:"0 0 0 0",height:"20%",maxHeight:"20%",display:'flex',justifyContent:"space-between",alignItems:'center'}}>
        <div className='logo_container'>
          <Image style={{display:"block"}} src={logo2} preview={false}></Image>
        </div>
          {/* <Image  preview={false} width={300} height={50} src={logo2} style={{objectFit:'cover',position:'absolute',left:"0",marginTop:"2%"}}/> */}
        
        {/* <div style={{color:"#eee",fontSize:'2rem',width:"50%",padding:"0 2% 0 2%"}}>체험단시대</div> */}
        <Button onClick={onLogOutClick} style={{margin:"1%"}}>로그아웃</Button>
      </Header>
      
      <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      </Carousel>

        
      


      <Content className="site-layout" style={{ paddingTop: '3%',height:"100%"}}>
        <Space style={{display:"flex",flexDirection:"column"}}>
          
          {isVisitors ? <BarChartComp visitors={visitors}></BarChartComp> : <Space style={{width:"100vw",height:"20vh",justifyContent:"center"}} size={'middle'}><Spin size="large" /></Space>}
              
          </Space>
          <div style={{minHeight: 500, background: colorBgContainer,textAlign:'center',justifyContent:'center',alignItems:'center',backgroundColor:"#eee"}}>
            <Space direction='horizontal'>
              <div style={{textAlign:'center'}}>
                <h2>
                  다양한 체험단을 확인해보세요
                </h2>
              </div>
              <div style={{position:'absolute',right:"5%",display:"flex",flexDirection:'column'}}> 
                <div>
                  {/* <span>방문자수</span> */}
                </div>
                <div>

                </div>
                
              </div>
              {/* <div style={{position:'absolute',right:"10%"}}>
                <h3>나우</h3>
              </div> */}
            </Space>
            
            <Space direction='horizontal' className="searchBar" size="middle" style={{ display: 'flex',margin:"20px",justifyContent:'center',justifyContent:'center', width:"100%"}}>
              
                {/* <div>출처</div> */}
                <div style={{width:"8rem"}}>
                  <Select 
                    className='optionPlatform'
                    defaultValue="전체"
                    onChange={handleChangePlatform}
                    style={{width:"100%"}}
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
                        value: '가보자체험단',
                        label: '가보자체험단',
                      },
                      {
                        value: '미블',
                        label: '미블',
                      },
                      {
                        value: '오마이블로그',
                        label: '오마이블로그',
                      },
                      {
                        value: '서울오빠',
                        label: '서울오빠',
                      },
                      {
                        value: '레뷰',
                        label: '레뷰',
                      },
                      {
                        value: '리뷰플레이스',
                        label: '레뷰플레이스',
                      },
                      {
                        value: '체험뷰',
                        label: '체험뷰',
                      },
                      {
                        value: '리뷰노트',
                        label: '리뷰노트',
                      },
                      {
                        value: '클라우드리뷰',
                        label: '클라우드리뷰',
                      },
                    ]}
                  />
                </div>
            
              <Input placeholder="검색어를 입력하세요" type="text" value={keyword} onChange={handleInputChange} style={{width:"100%",minWidth:"100%",textAlign:"center"}}/>
              <Button type="primary" icon={<SearchOutlined />} onClick={()=>{
                handleSearch();
                setPage(1);
              }}>
                검색
              </Button>       
          </Space>
          
          
          
            
          
              
            <Space wrap style={{padding:3, display:"flex",justifyContent:"center"}}>
              {
                buttonNames.map((elem,index)=>{
                  
                  return (
                    <Button key={index} value={elem} onClick={handleClick} type='primary'>#{elem}</Button> 
                  )
                })

              }
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
                  setSortBy('applyCount')
                  setSortOrder('asc')
                }else if(e==="지원 많은순"){
                  setSortBy('applyCount')
                  setSortOrder('dsc')
                }else if(e==="모집 적은순"){
                  setSortBy('demandCount')
                  setSortOrder('asc')
                }else if(e==="모집 많은순"){
                  setSortBy('demandCount')
                  setSortOrder('dsc')
                }else if(e==="기한 적은순"){
                  setSortBy('dday')
                  setSortOrder('asc')
                }else if(e==="기한 많은순"){
                  setSortBy('dday')
                  setSortOrder('dsc')
                }else{
                  setSortBy('')
                  setSortOrder('')
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
          {isLoading ? <CardLayout isLoading={isLoading} articles={articles}></CardLayout> : <Space style={{width:"100vw",height:"20vh",justifyContent:"center"}} size={'middle'}><Spin size="large" /></Space>}
          
          
          </div>



      </Content>
      <Space direction='horizontal' size='middle' style={{display:'flex',justifyContent:'center',margin:"1%"}}> 
        <Pagination style={{ textAlign: 'center' }} onChange={(e)=>{setPage(e)}} current={page} defaultCurrent={1} total={9999}  showSizeChanger={false}/>
      </Space>
      
      <Footer style={{ textAlign: 'center' }}> 체험단시대 ©2023 Created by AURAWORKS</Footer>

    </Layout>
  );
};

export default Home;