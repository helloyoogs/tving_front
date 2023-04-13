import * as React from 'react'
import { useState } from 'react';
import Axios from 'axios';
import Endpoint from '../config/Endpoint';
import {useNavigate} from 'react-router';
import PassComponent from "../PassComponent";

export type RequestSignUp = {
    username : string,
    password : string,
    name : string,
    email : string,
    address : string,
}

const PassContainer = () => {
    //const [username, setUserName] = useState("aaaa");
    // const [password, setPassword] = useState("");
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // const handleSignUp = (signUpRequest : RequestSignUp) => {
    //     Axios.post(Endpoint.authServer+'/user/signup',
    //         {
    //             username : signUpRequest.username,
    //             password : signUpRequest.password,
    //             name : signUpRequest.name,
    //             email : signUpRequest.email,
    //             address : signUpRequest.address
    //         })
    //         .then(response=>response.data)
    //         .then(data=> {
    //             if(data.response === "success"){
    //                 alert("회원가입이 완료됐습니다.");
    //                 navigate("/login");
    //             }
    //         })
    //         .catch(error=>{
    //             alert("회원가입이 실패했습니다.");
    //         })
    // };

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
            <PassComponent
              //  username = {username}
                // password = {password}
                // name = {name}
                // email = {email}
                // address = {address}
                // setUsername = {setUsername}
                // setPassword = {setPassword}
                // setName = {setName}
                // setEmail = {setEmail}
                // setAddress = {setAddress}
               // handleSignUp = {handleSignUp}
            />
        </div>
    )
}

export default PassContainer