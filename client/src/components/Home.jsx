import React from "react";
// import Header from './Header';
import Footer from "./home-page/Footer";
import About from "./home-page/About";
import Logo from "./Logo";
import WaitersEntry from "./home-page/WaitersEntry";
import EmployersEntry from "./home-page/EmployersEntry";

const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];

const Home = () => {
  return (
    <div>
      <Logo />
      <main>
        <h2>{slogan[Math.floor(Math.random() * slogan.length)]}</h2>
        <h2>בר, הפלטפורמה שמחברת בין מעסיקים למלצרים!</h2>
        <div className="entry-windows">
          <WaitersEntry />
          <EmployersEntry />
          <About />
        </div>
      </main>
    </div>
  );
};

export default Home;
