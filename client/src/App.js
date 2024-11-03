import Home from "./components/Home";
import Login from "./components/entry/Login";
import Register from "./components/entry/Register";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

import Managerdashboard from "./components/Managerdashbord.jsx";
import "./App.css";
import Logo from "./components/Logo";

const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];
export const typeOfUser = createContext(null);
export const userInfo = createContext(null);
function App() {
  const [isAwaiter, setIsAwaiter] = useState(true);
  const [user, setUser] = useState({name: "", catering: "", email: ""});
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
          <userInfo.Provider value={[user, setUser]}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events-manager" element={<Managerdashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </userInfo.Provider>
        </typeOfUser.Provider>
      </main>

      {/* <Managerdashboard /> */}

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
