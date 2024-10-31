// Register.js
import React, { useState, useRef, useContext } from "react";
import "../../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { typeOfUser } from "../../App";

function Register(props) {
  /**general ref's*/
  let email = useRef("");
  let password = useRef("");
  let confirmPassword = useRef("");
  /**employer ref's*/
  let companyName = useRef("");
  let contactPersonName = useRef("");
  let contactPersonPhone = useRef("");
  /**waiter ref's*/
  let firstName = useRef("");
  let lastName = useRef("");
  let phoneNumber = useRef("");
  let waiterAge = useRef("");
  /** hooks*/
  const [showPassword, setShowPassword] = useState(false);
  const [showCorenfinPassword, setShowCorenfinPassword] = useState(false);
  /** */
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);

  //   const handleRegister = (e) => {};
  const checkRegister = (event) => {
    event.preventDefault();
    let isTrue = email && password && confirmPassword;
    //TODO
    if (isAwaiter) {
    }
  };

  return (
    <div className="auth-container">
      <h2>הרשמה</h2>
      <form
      //    onSubmit={handleRegister}
      >
        {!isAwaiter && (
          <input type="text" placeholder="שם חברה" ref={companyName} required />
        )}
        {!isAwaiter && (
          <input
            type="text"
            placeholder="שם איש הקשר"
            ref={contactPersonName}
            required
          />
        )}
        {!isAwaiter && (
          <input
            type="text"
            placeholder="מספר של איש הקשר"
            ref={contactPersonPhone}
            required
          />
        )}
        {isAwaiter && (
          <input type="text" placeholder="שם פרטי" ref={firstName}></input>
        )}
        {isAwaiter && (
          <input type="text" placeholder="שם משפחה" ref={lastName}></input>
        )}
        {isAwaiter && (
          <input
            dir="rtl"
            type="tel"
            placeholder="פלאפון"
            ref={phoneNumber}></input>
        )}
        {isAwaiter && (
          <input type="date" placeholder="גיל" ref={waiterAge}></input>
        )}
        <input
          type="email"
          placeholder=" כתובת דואר אלקטרוני"
          ref={email}
          required
        />
        <div className="password-class">
          {" "}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמא"
            ref={password}
            required
          />
          <div
            className="eyeClick"
            onClick={() => setShowPassword(!showPassword)}>
            {(showPassword && <FaEyeSlash />) || <FaEye />}
          </div>
        </div>
        <div className="password-class">
          {" "}
          <input
            type={showCorenfinPassword ? "text" : "password"}
            placeholder="אימות סיסמא"
            ref={confirmPassword}
            required
          />
          <div
            className="eyeClick"
            onClick={() => setShowCorenfinPassword(!showCorenfinPassword)}>
            {(showCorenfinPassword && <FaEyeSlash />) || <FaEye />}
          </div>
        </div>

        <button type="submit" className="register-btn">
          התחברות
        </button>
      </form>
    </div>
  );
}

export default Register;
