import React from 'react'
import logo2 from '../pictures/logo2.png';
import { Card, Col, Row,Image,Input,Button, Space, Spin,Alert,Select,Badge,Dropdown, message,Carousel,Pagination,Layout,theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect,useState } from 'react';
import {addDoc,getDoc,collection, doc, getDocs,onSnapshot,orderBy,setDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue,get,child,limitToFirst,query,limitToLast} from "firebase/database";
import {dbService, database,authService} from '../firebase';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import banner1 from '../pictures/banner1.jpg';
import BarChartComp from './barchart'
import test from './test'
import CardLayout from './cardLayout';

export default function Test() {
  
  const [visitors, setVisitors] = useState([0,0,0,0,0]);
  const [isVisitors, setIsVisitors] = useState(false);
  const [articles,setArticles]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [keyword,setKeyword]=useState("")
  const [originArticles,setOriginArticles]=useState([])
  const [changedData,setChangedData]=useState([])
  const [filterStatus,setFilterStatus]=useState("이름순")
  const [source,setSource]=useState("전체")
  const [recentData,setRecentData]=useState([])

  // const getOriginArticles=async ()=>{  
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, 'data')).then((snapshot) => {
  //     if (snapshot.exists()) {

  //       let originData=snapshot.val()
  //       setOriginArticles(originData)
  //       setIsLoading(true)
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }
  const getOriginArticles=()=> {
    const db=getDatabase()
    const recentDataRef = query(ref(db, 'data'), limitToLast(100))
    onValue(recentDataRef, (snapshot) => {
      if(snapshot.exists()){
        setOriginArticles(snapshot.val())
      }else{
        console.log('no data')
      }
      // ...
    }, {
      onlyOnce: true
    });
    };
    

    const getArticles=async ()=>{  
    const db = getDatabase();
    const starCountRef = query(ref(db, 'data'),limitToFirst(10));
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        let data=snapshot.val()
        let originData=snapshot.val()
        setArticles(data)
        setOriginArticles(originData)
        setIsLoading(true)
      } else {
        console.log("No data available");
      }
    });
  }
  
  useEffect(()=>{
    getOriginArticles()
  },[])

  console.log(originArticles)

  return (
    <div>test</div>
  )
}
