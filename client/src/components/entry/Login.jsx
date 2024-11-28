import "../../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { typeOfUser } from "../../App";
import { FetchPost } from "../Fetch";
import { userInfo } from "../../App";
import GoHomeButton from "./GoHomeButton";
const serverUrl = "http://localhost:4000/login";

/*Components that show the login page, and handle with it. */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  const [user, setUser] = useContext(userInfo);
  const [title, setTitle] = useState(isAwaiter ? "מלצר" : "מנהל אירועים");
  const navagetTo = {manager:  "/events-manager", waiter: "/waiter"};
  let navigate = useNavigate();
  const handleLogin = (event) => {
    document.querySelector(".myForm").checkVisibility();
    event.preventDefault();
    let data = {
      email: email,
      password: password,
      isAwaiter: isAwaiter
    }
    console.log("Logging in with:", data);
    FetchPost(serverUrl, data, setUser);
  };
  
  /*A good way to use navaget in if statement. */
  useEffect(() => {
    if (user !== null && user !== false) {
      isAwaiter === true ?  navigate(navagetTo.waiter) :  navigate(navagetTo.manager);
      // This effect will run only when 'user' get value.
    }
  }, [user]);


  return (
    <div className="auth-container">
      <GoHomeButton/>
      <h2>התחברות כ{title}</h2>
      <form onSubmit={handleLogin} className="myForm">
        <input
          type="email"
          placeholder="כתובת דואר אלקטרוני"
          value={email || "uri@gourmetcatering.com"}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          required
          autoFocus
        />
        <div className="password-class">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמא"
            value={password || "gourmetPass123"}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="eyeClick"
            onClick={() => setShowPassword(!showPassword)}
          >
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
