//App.js

import React,{PureComponent,useEffect,useState} from 'react';
import { Button, Checkbox, Divider, Form, Input, Space,Image,Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./Login.css"
import { Container } from 'react-bootstrap';
import logo2 from '../pictures/logo1.png';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue,get,child} from "firebase/database";

function Register() {
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const [isComplete,setIsComplete]=useState(false)
    const [regiToken,setRegiToken]=useState("")
    const [isAvailable,setIsAvailable]=useState(true)
    const [inputToken,setInputToken]=useState("")
    
    const onChange = (event) => {
        const {
          target: { name, value }
        } = event
        if (name === 'email') {
          setEmail(value)
        } else if (name === 'password') {
          setPassword(value)
        } else if(name==='token'){
          console.log(inputToken)
          setInputToken(value)
        }

      }  
    
    const navigate=useNavigate()

    const getRegiToken=async ()=>{  
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'regiToken')).then((snapshot) => {
        if (snapshot.exists()) {
          let data=snapshot.val()
          setRegiToken(data)
          
        } else {
          console.log("No Token Data");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    
    useEffect(()=>{
      getRegiToken()
    },[])

    console.log(regiToken)

    const auth=getAuth()
    const onSubmit = async (event)=>{
        try{
            const data= await createUserWithEmailAndPassword(auth,email,password)
            console.log(data)
            setIsComplete(true)
            
        } catch(error){
            console.log(error)
            setError(error)
        }
    }
    const onClickHome=()=>{
        navigate("/")
    }
    if(isComplete){
        navigate("/")
    }

    const onCheckToken=()=>{
      try{
        console.log(inputToken,"/",regiToken)
        if (inputToken===regiToken){
          console.log("성공!")
          setIsAvailable(false)
          
        }
      }catch(error){
        console.log(error)
      }
    }


  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", marginTop:"25vh"}}>
        <div style={{display:"flex",width:"50vw",justifyContent:"center"}}>
            <Image onClick={onClickHome} style={{cursor:"pointer", display:"block", margin:"10% 0 10% 0",maxWidth:"100%"}} src={logo2} preview={false}></Image>
        </div>
        <Space style={{width:"30vw",height:"100vh"}}direction='vertical'>        
            
            <Input name='email' value={email} onChange={onChange} required size="default size" placeholder="아이디를 입력하세요" prefix={<UserOutlined />} />
            <Input.Password name="password" value={password} onChange={onChange} required placeholder="비밀번호를 입력하세요" />
            
            <Input placeholder="토큰을 입력하세요" name="token" onChange={onChange}/>
            {/* <Button onClick={onCheckToken} type="primary" disabled={!isAvailable} block>
            토큰확인
            </Button> */}
            <button onClick={onCheckToken} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg w-full text-sm px-3 py-2.5 ">토큰확인</button>
            <Button onClick={onSubmit} disabled={isAvailable} type="primary" block>
            회원가입
            </Button>
            {
                error&&<Alert style={{textAlign:"center"}} message={JSON.stringify(error.code)} type="error" />
            }
            {
                isComplete&&<Alert style={{textAlign:"center"}} message="회원가입을 완료하였습니다.홈으로 이동하여 로그인 하세요" type="error" />
            }
            
        </Space>               
    </div>  
        
    
  );
}
export default Register