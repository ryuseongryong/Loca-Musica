import { 
  Route, 
  Switch 
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          {/* Landing page */}
        </Route>


        <Route exact path='/musical'>
          {/* Main page */}
        </Route>
        <Route exact path='/search'>
          {/* 추천페이지 */}
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
        </Route>

      </Switch>
    </>
  );
}

export default App;
