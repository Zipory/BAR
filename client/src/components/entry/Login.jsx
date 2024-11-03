import "../../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { typeOfUser } from "../../App";
import  {FetchPost} from "../Fetch"
import { userInfo } from "../../App";
const serverUrl = "http://localhost:4000/";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  const [user, setUser] = useContext(userInfo);
  let navigate = useNavigate();
  const handleLogin = (e) => {
    document.querySelector(".myForm").checkVisibility();
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    FetchPost(serverUrl, { email, password, isAwaiter }, setUser);
    navigate("/events-manager");
  };

  return (
    <div className="auth-container">
      <h2>התחברות</h2>
      <form onSubmit={handleLogin} className="myForm">
        <input
          type="email"
          placeholder="כתובת דואר אלקטרוני"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           autoComplete="on"
          required
        />
        <div className="password-class">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמא"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="eyeClick"
            onClick={() => setShowPassword(!showPassword)}>
            {(showPassword && <FaEyeSlash />) || <FaEye />}
          </div>
        </div>
        <button type="submit" className="login-btn">
          התחברות
        </button>
      </form>
    </div>
  );
}

export default Login;
