/*eslint-disable*/

import {
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import { useSelector } from 'react-redux';

import './App.css';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Landing from './pages/landing';
import Header from './components/header';
import Search from './pages/search';
import Admin from './pages/admin';
import UserInfo from './pages/userinfo';
import Footer from './components/footer';
import NofiticationCenter from './components/notificationCenter';

import { signin } from './actions'
import { useEffect } from 'react';

function App() {

  const history = useHistory();

  // 상태관리
  const { isSignin, userInfo } = useSelector(state => {
    return {
      isSignin: state.userReducer.isSignin,
      uerInfo: state.userReducer.UserInfo
    }
  })
  // useEffect(() => {
  //   if(isSignin) history.push('/musical/main')
  //   else history.push('/')
  // }, [isSignin])

  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>

        <Route exact path='/musical/main'>
          {/* Main page */}
        </Route>
        <Route exact path='/search'>
          {/* 추천페이지 */}
          <Search />
        </Route>
        <Route exact path='/search/:title'>
          {/* 작품 상세페이지 */}
        </Route>

        <Route path='/user/signin'>
          <Signin />
        </Route>
        <Route path='/user/signup'>
          <Signup />
        </Route>
        <Route path='/user/info'>
          <UserInfo />
        </Route>

        <Route path='/admin'>
          <Admin />
        </Route>

      </Switch>
      <NofiticationCenter />
    </>
  );
}

export default App;
