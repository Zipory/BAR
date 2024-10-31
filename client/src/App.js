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

function App() {
  const [isAwaiter, setIsAwaiter] = useState(false);
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
        //testing
        <iframe
          title="Data viewer"
          width="700"
          height="400"
          src="https://data.gov.il/dataset/321/resource/a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3/view/8236830b-6549-4daa-8cf3-a4ad0265ec95"
          frameBorder="0"
        ></iframe>
        //testing
        <typeOfUser.Provider value={[isAwaiter, setIsAwaiter]}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </typeOfUser.Provider>
      </main>
      <Managerdashboard />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
