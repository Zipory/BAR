import Home from "./components/Home";
import Login from "./components/entry/Login";
import Register from "./components/entry/Register";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import LocatinInputs from "./components/LocationInputs.jsx";
import Managerdashboard from "./components/Managerdashbord.jsx";
import "./App.css";
import Logo from "./components/Logo";
import Newevent from "./components/manager/Newevent.jsx";
import Allevents from "./components/waiter/Allevents.jsx";
import {Getstreet, GetCity} from "./components/extra/Getstreet.jsx";
import Test from "./components/extra/Test.jsx"
import Teststreet from "./components/extra/Teststreet.jsx"
import EventFormModal from "./components/extra/Newform.jsx";
const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];
export const typeOfUser = createContext(null);
export const userInfo = createContext(null);
function App() {
  const [isAwaiter, setIsAwaiter] = useState(true);
  const [user, setUser] = useState(null);
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

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
