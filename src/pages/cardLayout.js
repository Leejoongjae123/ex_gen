import React from 'react'
import { Card, Col, Row,Image,Input,Button, Space, Spin,Alert,Select,Badge,Dropdown, message,Carousel,Pagination,Layout,theme } from 'antd';
const CardLayout = ({ articles,isLoading }) => {
    
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex',justifyContent:'center','alignItems':'center',padding:"0 5% 0 5%" }}>
            <Row gutter={16}>
              {
                articles.map((elem,index)=>{
                  
                  let partition=articles[index]['title'].indexOf(']');
                  let titleFront=articles[index]['title'].slice(0,partition+1);
                  let titleRr=articles[index]['title'].slice(partition+1,partition.length);
                  
                  return(
                  <Col key={index} xs={{span: 12}} lg={{span: 12}} style={{padding:"1%",alignItems:'center'}}>
                    <Badge.Ribbon text={`D-${elem['dday']}`} count={10} size="default" style={{}}>
                    <Card title={isLoading&&articles[index]['platform']} bordered={false} style={{padding:"0",border:"1px solid #eee",overflow:'hidden',width:"100%",height:"100%"}} headStyle={{fontSize:"1.5rem"}}>  
                        {isLoading
                        ?
                        <a target='_blank' href={elem['url']}><Image  preview={false} src={`https://storage.googleapis.com/experience-gen.appspot.com/${articles[index]['myImage']}.png`} style={{objectFit:'cover',borderRadius:"100%"}}/></a>
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
    );
  };
  
  export default CardLayout;


