/*eslint-disable*/
import React, {  useState } from "react";
import Header from "./Header";
import "./LoginComponent.css";
import { Input, Button, Form, Result } from "antd";
import Password from "antd/lib/input/Password";

type LoginProps = {
  username: string;
  setUsername: Function;
  password: string;
  setPassword: Function;
  doLogin: Function;
  doTest: Function;
  signUpByNaver: Function;
};

function LoginComponent({
                          username,
                          password,
                          setUsername,
                          setPassword,
                          doLogin,
                          doTest,
                          signUpByNaver,
                        }: LoginProps) {

    return (
    <div className="login_component">
      <Header content={[{ link: "/", name: "홈", type: "logo" }]} />
      <div className="login_container">
        <h2>반가워요! 아이디와 비밀번호를 입력해주세요.</h2>
        <Form onFinish={() => {
          doLogin(username, password);
        }}>
            <Form.Item
              name="userId"
              rules={[{ required: true, message: "Please input yourname!" }]}
              style={{
                borderBottom: '1px solid #a3a3a3',
                padding: '.2rem',
                width: '100%',
                color:'#ffffff'}}
          >
                <label>ID :
                <Input placeholder="아이디입력"
                   type={'text'}
                   value={username}
                   onChange={(e:any) => setUsername(e.target.value)}/>
                </label>
          </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input password!" }]}
              name="password"
              style={{
                borderBottom: '1px solid #a3a3a3',
                padding: '.2rem',
                width: '100%',
                color:'#ffffff'}}
          >
                <label>PW :
                    <Input.Password placeholder="비밀번호입력"   type={'password'} value={password}
                            onChange={(e:any) => setPassword(e.target.value)} autoComplete={'on'} style={{backgroundColor:'transparent',color:'#ffffff'}}/>
                </label>

          </Form.Item>
          <Form.Item style={{
            margin: '2rem auto 0 auto'
          }}>
            <Button htmlType="submit" >
              로그인
            </Button>
          </Form.Item>
        </Form>
        <div className="content_box">
          <a>아이디 찾기</a>
          <a>비밀번호 찾기</a>
          <a href={"/join"}>회원가입</a>
        </div>
      </div>
      <footer>
        <p>Copyright © 주식회사 티빙 All right reserved.</p>
      </footer>
    </div >
  );
}

export default LoginComponent;
