import * as React from 'react'
import { useState } from 'react';
import SignUpPresenter from '../Presenter/SignUp/SignUpPresenter';
import Axios from 'axios';
import Endpoint from '../config/Endpoint';
import {useNavigate} from 'react-router';
import JoinComponent from "../JoinComponent";

export type RequestSignUp = {
  username : string,
  password : string,
  name : string,
  email : string,
  address : string,
}

const JoinContainer = () => {

  const [username, setUsername] = useState("aaaa");
  const [password, setPassword] = useState("aaaa");
  const [name, setName] = useState("알파카");
  const [email, setEmail] = useState("helloyoogs@naver.com");
  const [address, setAddress] = useState("대구");
  const navigate = useNavigate();

  const handleSignUp = (signUpRequest : RequestSignUp) => {
    Axios.post(Endpoint.authServer+'/user/signup',
    {
      username : signUpRequest.username,
      password : signUpRequest.password,
      name : signUpRequest.name,
      email : signUpRequest.email,
      address : signUpRequest.address
    })
    .then(response=>response.data)
    .then(data=> {
      if(data.response === "success"){
        alert("회원가입이 완료됐습니다.");
        navigate("/login");
      }
    })
    .catch(error=>{
      alert("회원가입이 실패했습니다.");
    })
  };

  return (
    <div>
      {/*<SignUpPresenter*/}
      {/*  username = {username}*/}
      {/*  password = {password}*/}
      {/*  name = {name}*/}
      {/*  email = {email}*/}
      {/*  address = {address}*/}
      {/*  setUsername = {setUsername}*/}
      {/*  setPassword = {setPassword}*/}
      {/*  setName = {setName}*/}
      {/*  setEmail = {setEmail}*/}
      {/*  setAddress = {setAddress}*/}
      {/*  handleSignUp = {handleSignUp}*/}
      {/*/>*/}
      <JoinComponent
        username = {username}
        password = {password}
        name = {name}
        email = {email}
        address = {address}
        setUsername = {setUsername}
        setPassword = {setPassword}
        setName = {setName}
        setEmail = {setEmail}
        setAddress = {setAddress}
        handleSignUp = {handleSignUp}
      />
    </div>
  )
}

export default JoinContainer