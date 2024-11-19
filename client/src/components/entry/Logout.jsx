import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../App";
const Logout = () => {
    const [user, setUser] = useContext(userInfo);
    const navigate = useNavigate();
  function logout() {
    window.localStorage.removeItem("bar");
    window.localStorage.removeItem("isWaiter");
    setUser(() => null);
    navigate("/home");
  }
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
