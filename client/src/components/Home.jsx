import React from "react";
import About from "./home-page/About";
import Logo from "./Logo";
import WaitersEntry from "./home-page/WaitersEntry";
import EmployersEntry from "./home-page/EmployersEntry";
import Login from "./entry/Login";
const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];

const Home = () => {
  return (
    <div>
      <Logo />
      <h2>{slogan[Math.floor(Math.random() * slogan.length)]}</h2>
      <h2>בר, הפלטפורמה שמחברת בין מעסיקים למלצרים!</h2>
      <div className="entry-windows">
        <WaitersEntry />
        <EmployersEntry />
      </div>
      <Login />
      <About />
    </div>
  );
};

export default Home;
