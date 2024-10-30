import React from "react";
import { Link } from "react-router-dom";
import "../../style/Login.css";
const Login = () => {
  return (
    <div className="login">
      <h1 className="login-element">התחברות</h1>
      <input type="text" className="login-element" />
      <input type="text" className="login-element" />
      <input type="checkbox" className="login-element" />
      <button className="login-element">התחבר</button>
      <Link to={""}>עוד לא רשום?</Link>
    </div>
  );
};

export default Login;
