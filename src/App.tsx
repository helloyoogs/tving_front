/*eslint-disable*/
import React, {useState} from 'react';
import './common.css';
import { Routes, Route } from 'react-router-dom'
import OnBoardingComponent from './OnBoardingComponent';
import MainComponent from './MainComponent';
import LoginComponent from './LoginComponent';
import JoinComponent from "./JoinComponent";
import {LoginPage, JoinPage, PassPage} from "./Container";
import MyPageComponent from "./MyPageComponent";
import MovieDetailComponent from "./MovieDetailComponent";
import TvDetailComponent from "./TvDetailComponent";

const App = ()=> {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<OnBoardingComponent />} />
        <Route path='/main' element={<MainComponent />} />
          <Route path='/join' element={<JoinPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/pass' element={<PassPage />} />
          <Route path='/my' element={<MyPageComponent />} />
        <Route path='/movieDetail/:id' element={<MovieDetailComponent />} />
        <Route path='/tvDetail/:id' element={<TvDetailComponent />} />
          {/*<Route path='/login/oauth' element={<SocialLoginingPage />} />*/}

      </Routes>
    </div>
  );
}

export default App;
