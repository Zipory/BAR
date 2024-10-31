import Home from "./components/Home";
import Login from "./components/entry/Login";
import Register from "./components/entry/Register";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import Info from "./components/manager/Info.jsx";

import "./App.css";
import Logo from "./components/Logo";

const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];
export const typeOfUser = createContext(null);

function App() {
  const [isAwaiter, setIsAwaiter] = useState(true);
  return (
    <>
      <header></header>
      <main>
        <div className="logo logo-website">
          <Logo />
          <h2>{slogan[Math.floor(Math.random() * slogan.length)]}</h2>
          <h2>
            <u>בר</u>, הפלטפורמה שמחברת בין מעסיקים למלצרים!
          </h2>
          {/* {(isAwaiter && <h2>הוא מלצר</h2>) || <h2>הוא מעסיק</h2>} */}
        </div>
        <typeOfUser.Provider value={[isAwaiter, setIsAwaiter]}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </typeOfUser.Provider>
      </main>
      <Info />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
