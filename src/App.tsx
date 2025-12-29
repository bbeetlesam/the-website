import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Home from "./components/Home.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  const location = useLocation();
  const isOverflowAllowed = location.pathname === "/"; // home path only, currently

  return (
    <div className={`min-h-screen grid grid-rows-[auto_1fr_auto] bg-grid`}>
      <Header />
      <main className={`${isOverflowAllowed ? 'overflow-hidden' : 'overflow-y-auto'} min-h-0 py-2`}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
