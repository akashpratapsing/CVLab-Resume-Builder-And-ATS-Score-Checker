import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/navbar";
import About from "./components/About"
import ContactUs from "./components/ContactUs"
import AtsChecker from "./components/AtsChecker";
import ResumeForm from "./components/ResumeForm"


function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<ResumeForm/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/ats" element={<AtsChecker/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
