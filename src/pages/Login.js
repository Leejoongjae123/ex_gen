//App.js

import React,{PureComponent, useState} from 'react';
import { Button, Checkbox, Divider, Form, Input, Space,Image,Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./Login.css"
import { Container } from 'react-bootstrap';
import logo2 from '../pictures/logo1.png';
import { useNavigate } from 'react-router-dom';
import {authService} from '../firebase'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth } from 'firebase/auth';



function Login() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const onChange = (event) => {
        const {
          target: { name, value }
        } = event
        if (name === 'email') {
          setEmail(value)
        } else if (name === 'password') {
          setPassword(value)
        }
      }

    const auth=getAuth()
    const onSubmit = async (event)=>{
        try{
            const data= await signInWithEmailAndPassword(auth,email,password)
            console.log(data)
        } catch(error){
            console.log(error)
            setError(error)
        }
        
    }

    const navigate=useNavigate()
    const handleRegisterClick = () => {
        navigate('/register')
    };

    const handleLoginClick = () => {
        navigate('/products')
    };


    
    
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", marginTop:"25vh"}}>
        <div style={{display:"flex",width:"50vw",justifyContent:"center"}}>
            <Image style={{display:"block", margin:"10% 0 10% 0",maxWidth:"100%"}} src={logo2} preview={false}></Image>
        </div>
        <Space style={{width:"30vw"}}direction='vertical'>        
            <Input name='email' value={email} onChange={onChange} required size="default size" placeholder="아이디를 입력하세요" prefix={<UserOutlined />} />
            <Input.Password name="password" value={password} onChange={onChange} required placeholder="비밀번호를 입력하세요" />
            
            <button onClick={onSubmit} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg w-full text-sm px-3 py-2.5 my-2 ">로그인</button>

            {/* <Button onClick={onSubmit} type="primary" block>
            로그인
            </Button> */}
            <button onClick={handleRegisterClick} type="button" class="text-black bg-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg w-full text-sm px-3 py-2.5">회원가입</button>
            {/* <Button onClick={handleRegisterClick} type="dashed" block>
            회원가입
            </Button> */}
            {error&&<Alert message={JSON.stringify(error.code)} type="error" />}
            
        </Space>               
    </div>  
        
    
  );
}
export default Login