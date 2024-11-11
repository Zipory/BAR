import React, { useState, useRef, useContext } from "react";
import "../../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { typeOfUser } from "../../App";
import { FetchPost } from "../Fetch";
import { useNavigate } from "react-router-dom";
import useUserEffect from "../../hooks/useUserEffect";

const postUrl = "http://localhost:4000/register"

/*function to create a new event-manager or a waiter. */
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
  const [singupOk, setSingupOk] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  const [title, setTitle] = useState(isAwaiter ? "מלצר": "מנהל אירועים");
  /** */
  /* nav to login after singup. */
  let navigate = useNavigate();
  useUserEffect(singupOk, navigate, "/login");

  /*for events-manager: create the post request, and set singup  */
  const managerRegister = (event) => {
    document.querySelector(".myForm").checkVisibility();
    event.preventDefault();
    console.log(email.current.value, companyName, password);
    let allInputs = {
      email: email.current.value,
      password: password.current.value,
      companyName: companyName.current.value,
      contactPersonName: contactPersonName.current.value,
      contactPersonPhone: contactPersonPhone.current.value,
      isAwaiter: isAwaiter
    }
    FetchPost(postUrl, allInputs, setSingupOk, allInputs["email"])
  }

   /*for waiter: create the post request, and set singup  */
  const waiterRegister = (event) => {
    document.querySelector(".myForm").checkVisibility();
    event.preventDefault();
    console.log(email.current.value);
    let allInputs = {
      email: email.current.value, 
      firstName: firstName.current.value, 
      lastName: lastName.current.value,
      phoneNumber: phoneNumber.current.value,
      waiterAge: waiterAge.current.value,
      isAwaiter: isAwaiter
    }
    FetchPost(postUrl, allInputs, setSingupOk, allInputs["email"]);
  }
  return (
    <div className="auth-container">
      <h2>הרשמה כ{title}</h2>
      <form className="myForm"
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

        <button type="submit" className="register-btn" onClick={!isAwaiter ? managerRegister : waiterRegister}>
          התחברות
        </button>
      </form>
      {/* trying to create a popup if singup successed or not. */}
      {singupOk && <h1>new user created.</h1> && setTimeout(() => {
      }, 3000)}
    </div>
  );
}

export default Register;
