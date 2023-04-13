import * as React from "react";
import { useState } from "react";
import MainPresenter from "../Presenter/Main/MainPresenter";
import axios from "axios";
// import Endpoint from "../config/Endpoint";
// import cookies from "js-cookie";
import { useNavigate } from "react-router";
import LoginComponent from "../LoginComponent";

const LoginContainer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate ();

  const doLogin = (username: string, password: string) => {
    axios
      .post(
        "http://localhost:8080/user/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.response === "success") {
          alert("로그인 성공");
            navigate("/main");
        }
      })
      .catch((error) => {
          alert("로그인 실패");

          console.error(error);
      });
  };

  const doTest = () => {
      navigate("/signup");
  };

  const signUpByNaver = async (id: string, email: string,name : string, type: string) => {
    const response = await axios.post(
      "http://localhost:8080/oauth/signup/naver",
      {
        id,
        email,
        name,
        type,
      },
      { withCredentials: true }
    );
    const data = response.data;
    if (data.response === "success") {
      alert("성공적으로 회원가입이 됐습니다.");
    }else console.log(data);
  };

  return (
    <div>
      {/*<MainPresenter*/}
      {/*  username={username}*/}
      {/*  setUsername={setUsername}*/}
      {/*  password={password}*/}
      {/*  setPassword={setPassword}*/}
      {/*  doLogin={doLogin}*/}
      {/*  doTest={doTest}*/}
      {/*  signUpByNaver={signUpByNaver}*/}
      {/*/>*/}
        <LoginComponent
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            doLogin={doLogin}
            doTest={doTest}
            signUpByNaver={signUpByNaver}
        />
    </div>
  );
};

export default LoginContainer;
