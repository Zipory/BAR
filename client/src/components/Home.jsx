import React from "react";
import Footer from "./home-page/Footer";
import WaitersEntry from "./home-page/WaitersEntry";
import EmployersEntry from "./home-page/EmployersEntry";
const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];
const HomePage = () => {
  return (
    <div className="home">
      <h2>{slogan[Math.floor(Math.random() * slogan.length)]}</h2>
      <h2>בר, הפלטפורמה שמחברת בין מעסיקים למלצרים!</h2>
      <div className="entry-windows">
        <WaitersEntry />
        <EmployersEntry />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
