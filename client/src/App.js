import Home from "./components/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import  Info from "./components/manager/Info.jsx"
import "./App.css";
function App() {
  return (
    <>
      <header></header>
      <main>
        <Home />
      </main>
      <Info/>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
