import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Landing() {
  let history = useHistory();
  const isSignin = useSelector((state) => state.userReducer.isSignin);

  return (
    <>
      {isSignin ? history.push("/musical/main") : null}
      <div>Loca Musica!</div>
    </>
  );
}

export default Landing;
