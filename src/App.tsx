import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./components/Home.tsx";
import Footer from "./components/Footer.tsx";
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-grid">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
