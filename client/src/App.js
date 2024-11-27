import Logo from "./components/Logo";
import Home from "./components/Home";
import Login from "./components/entry/Login";
import Register from "./components/entry/Register";
import Footer from "./components/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import Managerdashboard from "./components/Managerdashbord.jsx";
import WaiterDashboard from "./components/WaiterDashboard.jsx";
import "./App.css";
import { CheckToken } from "./components/entry/CheckToken.js";
import GetUserInfo from "./components/entry/GetUserInfo.jsx";
import FirstNav from "./components/entry/FirstNav.jsx";
import Logout from "./components/entry/Logout.jsx";
import filterEvents from "./components/extra/filterEvents.js";
import HomePage from "./components/web-manager/HomePage.jsx";
const slogan = [
  "תמיד חלמת לעבוד בזמנים שלך?",
  "יש לך זמן פנוי שאתה רוצה לעבוד בו?",
  "שובר את הראש בגיוס מלצרים בכל אירוע מחדש?",
];
export const typeOfUser = createContext(null);
export const userInfo = createContext([null]);

// Custom Route Component
const ProtectedRoute = ({ children }) => {
  console.log("inside protected");

  if (CheckToken()) {
    return children; // Render the child component if the check passes.
  } else {
    console.log("not-allowed");
    return <Navigate to="/home" />; // Redirect if the check fails.
  }
};

// const NotAllowed = () => <div>Access Denied</div>;
/**The main component that get all childrens, and create the user useState */
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
            <GetUserInfo />
            <Routes>
              <Route path="/" element={<FirstNav/>}/>
              <Route path="/web-manager" element={<HomePage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/events-manager"
                element={
                  <ProtectedRoute>
                    <Logout />
                    <Managerdashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/waiter"
                element={
                  <ProtectedRoute>
                    <Logout />
                    <WaiterDashboard />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/not-allowed" element={<NotAllowed />} /> */}
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
