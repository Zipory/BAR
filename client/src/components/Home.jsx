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
      <div className="entry-windows">
        <WaitersEntry />
        <EmployersEntry />
      </div>
      <About />
    </div>
  );
};

export default Home;
