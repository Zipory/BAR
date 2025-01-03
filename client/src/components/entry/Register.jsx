import React, { useState, useRef, useEffect, useContext } from "react";
import "../../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { typeOfUser } from "../../App";
import { FetchPost } from "../Fetch";
import { useNavigate } from "react-router-dom";
import GoHomeButton from "./GoHomeButton";
import CloudinaryHandle from "../waiter/profile/CloudinaryHandle";
const postUrl = `/register`;

/*function to create a new event-manager or a waiter. */
function Register() {
  /**general ref's*/
  let email = useRef("");
  let password = useRef("");
  let confirmPassword = useRef("");
  /**employer ref's*/
  let companyName = useRef("");
  let contactPersonName = useRef("");
  let contactPersonPhone = useRef("");
  // about
  let about = useRef("");
  /**waiter ref's*/
  let firstName = useRef("");
  let lastName = useRef("");
  let phoneNumber = useRef("");
  let waiterAge = useRef("");
  let [gender, setGender] = useState("");
  let image = useRef("");
  /** hooks*/
  const [showPassword, setShowPassword] = useState(false);
  const [showCorenfinPassword, setShowCorenfinPassword] = useState(false);
  const [singupOk, setSingupOk] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null)
  const [title, setTitle] = useState(isAwaiter ? "מלצר" : "מנהל אירועים");
  const [message, setMessage] = useState("   ");

  /* nav to login after singup. */
  let navigate = useNavigate();
  useEffect(() => {
    if (singupOk !== null && singupOk !== false) {
      navigate("/login");
    }
  }, [singupOk]);


const passwordVerification = (pass1, pass2) => {
  return pass1 === pass2;
}

const addMessage = (mes) => {
    setMessage(mes)  
    // console.log("hello");
    
    setTimeout( () => setMessage("    "), 2000 );
}

  /*for events-manager: create the post request, and set singup  */
  const managerRegister = (event) => {
    let isValid = document.querySelector(".myForm").checkValidity();
      if (isValid) {
        event.preventDefault();
        if (passwordVerification(password.current.value, confirmPassword.current.value)) {
    let allInputs = {
      email: email.current.value,
      password: password.current.value,
      company_name: companyName.current.value,
      manager: contactPersonName.current.value,
      manager_phone: contactPersonPhone.current.value,
      about: about.current.value,
      isAwaiter: isAwaiter,
    };
    FetchPost(postUrl, allInputs, setSingupOk);
  }
  else {
    addMessage("אימות סיסמא לא תקין.");
  }
  }
  };

  /*for waiter: create the post request, and set singup  */
  const waiterRegister = (event) => {
    console.log("here")
   
    let isValid = document.querySelector(".myForm").checkValidity();
  // document.querySelector(".myForm").checkVisibility();

    if (isValid) {
       event.preventDefault();
       if (passwordVerification(password.current.value, confirmPassword.current.value)) {
    console.log(email.current.value);
    let allInputs = {
      email: email.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      password: password.current.value,
      phone: phoneNumber.current.value,
      birthday: waiterAge.current.value,
      isAwaiter: isAwaiter,
      gender : gender,
      image : cloudinaryUrl
    };
    FetchPost(postUrl, allInputs, setSingupOk);
    console.log(allInputs);
  }
  else {
    addMessage("אימות סיסמא לא תקין.");
  }
}
    
  };
  const handleRadio = (event) => {
    setGender(() => event.target.value);
  };
  return (
    <div className="auth-container">
      <GoHomeButton/>
      <h2>הרשמה כ{title}</h2>
      <form className="myForm">
        {!isAwaiter && (
          <input type="text" placeholder="שם חברה" ref={companyName} autoFocus required />
        )}
        {!isAwaiter && (
          <input
            type="text"
            placeholder="שם איש הקשר"
            ref={contactPersonName}
            required
            pattern="^[\u0590-\u05FF]{2,}$"
            title="שם לא תקין: 2 אותיות לפחות בעברית בלבד"
          />
        )}
        {!isAwaiter && (
          <input
            type="text"
            placeholder="מספר פלאפון של איש הקשר"
            ref={contactPersonPhone}
            pattern="^\d{10}$"
            required
            title="נא להכניס מספר פלאפון תקין: 10 ספרות"
          />
        )}
        {!isAwaiter && (
          <textarea
            // rows="2"
            // cols="20"
            // wrap="hard"
            ref={about}
            name="about"
            placeholder="קצת על החברה"
            maxLength={100}
          />
        )}
        {isAwaiter && (
          <input type="text" placeholder="שם פרטי" ref={firstName} autoFocus  required 
               pattern="^[\u0590-\u05FF]{2,}$"
            title="שם פרטי לא תקין: 2 אותיות לפחות בעברית בלבד"
          ></input>
        )}
        {isAwaiter && (
          <input type="text" placeholder="שם משפחה" ref={lastName}  required
              pattern="^[\u0590-\u05FF]{2,}$"
            title="שם משפחה לא תקין: 2 אותיות לפחות בעברית בלבד"
          ></input>
        )}
        {isAwaiter && (
          <input
            dir="rtl"
            type="tel"
            placeholder="פלאפון"
            ref={phoneNumber}
            pattern="^\d{10}$"
            required
            title="נא להכניס מספר פלאפון תקין: 10 ספרות"
          ></input>
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
        {/* --------- gender -------------- */}
        {isAwaiter && (
        <div className="gender">
          <label htmlFor="gender">זכר</label>
          <input
            type="radio"
            value="Male"
            onChange={handleRadio}
         
            name="gender"
            required
          />
          <label htmlFor="gender">נקבה</label>
          <input
            type="radio"
            onChange={handleRadio}
          
            value="Female"
            name="gender"
            required
          />
          <label htmlFor="gender">אחר</label>
          <input
            type="radio"
            onChange={handleRadio}
            value="Other"
            name="gender"
            required
          />
        </div>
         )}
        <div className="password-class">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמא"
            ref={password}
            required
          />
          <div
            className="eyeClick"
            onClick={() => setShowPassword(!showPassword)}
          >
            {(showPassword && <FaEyeSlash />) || <FaEye />}
          </div>
        </div>
        <div className="password-class">
          <input
            type={showCorenfinPassword ? "text" : "password"}
            placeholder="אימות סיסמא"
            ref={confirmPassword}
            required
          />
          <div
            className="eyeClick"
            onClick={() => setShowCorenfinPassword(!showCorenfinPassword)}
          >
            {(showCorenfinPassword && <FaEyeSlash />) || <FaEye />}
          </div>
        </div>
        {isAwaiter && (
        <CloudinaryHandle setCloudinaryUrl={setCloudinaryUrl} cloudinaryUrl={cloudinaryUrl}/>
        )}
        <div>{message}</div>
        <button
          type="submit"
          className="register-btn"
          onClick={!isAwaiter ? managerRegister : waiterRegister}
        >
          התחברות
        </button>
       
      </form>
      {/* trying to create a popup if singup successed or not. */}
      {/* {singupOk && <h1>new user created.</h1> && setTimeout(() => {}, 3000)} */}
    
    </div>
  );
}
function doit(event) {
  console.log(event.target.value);
  
}
export default Register;
