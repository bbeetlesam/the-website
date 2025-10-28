import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Home from "./components/Home.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  const location = useLocation();
  const isOverflowAllowed = location.pathname === "/"; // home path only, currently

  return (
    <div className={`min-h-screen flex flex-col bg-grid`}>
      <Header />
      <div className={`flex-1 min-h-0 flex flex-col ${isOverflowAllowed ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;