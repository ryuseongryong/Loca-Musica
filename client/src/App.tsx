import {
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Signup from './pages/signup';
import Landing from './pages/landing';
import Header from './components/header';
import Search from './pages/search';
import Admin from './pages/admin';


function App() {
  return (
    <>
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
          {/* Sign in */}
        </Route>
        <Route path='/user/signup'>
          {/* Sign up */}
        </Route>
        <Route path='/user/info'>
          {/* My page */}
        </Route>


        <Route path='/admin'>
          {/* Admin page */}
          <Admin />
        </Route>

      </Switch>
    </>
  );
}

export default App;
