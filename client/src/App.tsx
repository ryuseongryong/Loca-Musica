import {
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Landing from './pages/landing';
import Header from './components/header';
import Search from './pages/search';
import Admin from './pages/admin';
import UserInfo from './pages/userinfo';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          {/* Landing page */}
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
          {/* Admin page */}
          <Admin />
        </Route>

      </Switch>

      <Footer />
    </>
  );
}

export default App;
