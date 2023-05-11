/*eslint-disable*/
import React, {useEffect, useState} from "react";
import Header from "./Header";
import "./JoinComponent.css";
import {RequestSignUp} from "./Container/JoinContainer";
import {Button, Form, Input} from "antd";

type JoinProps = {
  username: string,
  setUsername: Function,
  password: string,
  setPassword: Function,
  name: string,
  setName: Function,
  email: string,
  setEmail: Function,
  address : string,
  setAddress : Function,
  handleSignUp: Function,
};
const JoinComponent = ({
                         username,
                         password,
                         name,
                         email,
                         address,
                         setUsername,
                         setPassword,
                         setName,
                         setEmail,
                         setAddress,
                         handleSignUp
                       }: JoinProps) => {


  return (
    <div className="join_component">
      <Header content={[{ link: "/", name: "홈", type: "logo" }]}  />
      <div className="join_container">
        <h2>회원가입</h2>
        <Form
            onFinish={() => {
              const requestSignUp : RequestSignUp = {
                username,password,name,email,address
              }
              handleSignUp(requestSignUp);
            }}
        >
          <Form.Item
              name="username"
              style={{
                borderBottom: '1px solid #a3a3a3',
                padding: '.2rem',
                width: '100%',
                color:'#ffffff'}}
          >
            <label>ID :
              <Input placeholder="아이디 입력"
                     type={'text'}
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                     required/>
            </label>
          </Form.Item>
          <Form.Item
              name="password"
              style={{
                borderBottom: '1px solid #a3a3a3',
                padding: '.2rem',
                width: '100%',
                color:'#ffffff'}}
          >
            <label>PW :
              <Input.Password placeholder="비밀번호 입력"
                     type={'password'}
                     value={password}
                     onChange={e => setPassword(e.target.value)} style={{backgroundColor:'transparent',color:'#ffffff'}} required/>
            </label>
          </Form.Item>
          <Form.Item
              name="name"
              style={{
                borderBottom: '1px solid #a3a3a3',
                padding: '.2rem',
                width: '100%',
                color:'#ffffff'}}
          >
            <label>Name :
              <Input placeholder="이름 입력"
                              type={'text'}
                              value={name}
                              onChange={e => setName(e.target.value)} required/>
            </label>
          </Form.Item>
          <Form.Item
              name="email"
              style={{
                borderBottom: '1px solid #a3a3a3',
                padding: '.2rem',
                width: '100%',
                color:'#ffffff'}}
          >
            <label>EMAIL :
              <Input placeholder="이메일 입력"
                     type={'text'}
                     value={email}
                     onChange={e => setEmail(e.target.value)} required/>
            </label>
          </Form.Item>
          <Form.Item
              style={{
                borderBottom: '1px solid #a3a3a3',
                padding: '.2rem',
                width: '100%',
                color:'#ffffff'}}
          >
            <label>ADDRESS :
              <Input placeholder="주소 입력"
                     type={'text'}
                     value={address}
                     onChange = {e=>setAddress(e.target.value)} required/>
            </label>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit"  >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
      <footer>
        <p>Copyright © 주식회사 티빙 All right reserved.</p>
      </footer>
    </div >
  );
}

export default JoinComponent;
