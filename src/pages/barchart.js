import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React from 'react'
import { Card, Col, Row,Image,Input,Button, Space, Spin,Alert,Select,Badge,Dropdown, message,Carousel,Pagination,Layout,theme } from 'antd';
const BarChartComp = ({ visitors }) => {
    console.log(visitors)
    return (
    <Space style={{display:"flex",flexDirection:"column"}}>
        <h7 style={{color:"#000000"}}>방문자수</h7>
            <BarChart
            style={{color:"black"}} 
                    width={400}
                    height={100}
                    data={visitors}
                    fontSize="100%"
                    margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20
                    }}
                    padding={{

                    }}
                >
            <XAxis dataKey="name" style={{color:"black",fill:"black"}} />
            <Bar dataKey="visitors" fill="#0d6efd" label={{position:"top",fill:"black"}}/>
        </BarChart>
      </Space>
    );
  };
  
  export default BarChartComp;

