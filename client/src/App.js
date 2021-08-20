/*eslint-disable*/
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Landing from "./pages/landing";
import Main from "./pages/main";
import Header from "./components/header";
import Search from "./pages/search";
import Admin from "./pages/admin";
import UserInfo from "./pages/userinfo";
import Detail from "./pages/detail";
import NofiticationCenter from "./components/notificationCenter";
import AdminEdit from "./pages/adminEdit";
import { useState } from 'react';

function App() {
  // 상태관리
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSignin, userInfo } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
    };
  });
  useEffect(() => {
    if (isSignin) {
      history.push("/musical/main");
    }
  }, [isSignin]);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/musical/main">
          {/* Main page */}
          <Main />
        </Route>
        <Route exact path="/search">
          {/* 추천페이지 */}
          <Search />
        </Route>
        <Route path="/search/:title">{/* <Detail /> */}</Route>

        <Route path="/detail">
          <Detail />
        </Route>

        <Route path="/user/signin">
          <Signin />
        </Route>
        <Route path="/user/signup">
          <Signup />
        </Route>
        <Route path="/user/info">
          <UserInfo />
        </Route>

        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/adminEdit">
          <AdminEdit />
        </Route>
      </Switch>
      <NofiticationCenter />
    </>
  );
}

export default App;
