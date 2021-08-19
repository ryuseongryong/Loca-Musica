/*eslint-disable*/

import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Landing from "./pages/landing";
import Header from "./components/header";
import Search from "./pages/search";
import Admin from "./pages/admin";
import UserInfo from "./pages/userinfo";
import Detail from "./pages/detail";
import NofiticationCenter from "./components/notificationCenter";
import AdminEdit from "./pages/adminEdit";


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
  // useEffect(() => {
  //   if (isSignin) history.push("/musical/main");
  //   else history.push("/");
  // }, [isSignin]);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/musical/main">{/* Main page */}</Route>
        <Route exact path="/search">
          {/* 추천페이지 */}
          <Search />
        </Route>
        <Route path="/search/:title">{/* 작품 상세페이지 */}</Route>

        <Route path="/detail">
          {/* 임시 작품 상세페이지 */}
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
