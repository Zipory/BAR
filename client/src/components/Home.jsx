import React from "react";
import About from "./home-page/About";
import WaitersEntry from "./home-page/WaitersEntry";
import EmployersEntry from "./home-page/EmployersEntry";
import Login from "./entry/Login";
import Register from "./entry/Register";
import Logo from "./Logo";

const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];

const Home = () => {
  return (
    <div>
      {/* <div className="logo logo-website">
        <Logo />
        <h2>{slogan[Math.floor(Math.random() * slogan.length)]}</h2>
        <h2>
          <u>בר</u>, הפלטפורמה שמחברת בין מעסיקים למלצרים!
        </h2>
      </div> */}

      <div className="entry-windows">
        <WaitersEntry />
        <EmployersEntry />
      </div>
      {/* <Login />
      <Register /> */}
      <About />
    </div>
  );
};

export default Home;
