// Register.js
import React, { useState, useRef } from "react";
import "../../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
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
  const [isAwaiters, setIsAwaiters] = useState(true);

  //   const handleRegister = (e) => {};

  return (
    <div className="auth-container">
      <h2>הרשמה</h2>

      <form
      //    onSubmit={handleRegister}
      >
        {!isAwaiters && (
          <input type="text" placeholder="שם חברה" ref={companyName} required />
        )}
        {!isAwaiters && (
          <input
            type="text"
            placeholder="שם איש הקשר"
            ref={contactPersonName}
            required
          />
        )}
        {!isAwaiters && (
          <input
            type="text"
            placeholder="מספר של איש הקשר"
            ref={contactPersonPhone}
            required
          />
        )}
        {isAwaiters && (
          <input type="text" placeholder="שם פרטי" ref={firstName}></input>
        )}
        {isAwaiters && (
          <input type="text" placeholder="שם משפחה" ref={lastName}></input>
        )}
        {isAwaiters && (
          <input
            dir="rtl"
            type="tel"
            placeholder="פלאפון"
            ref={phoneNumber}></input>
        )}
        {isAwaiters && (
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
