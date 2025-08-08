// main component
import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";

function Main(){
  return (
    <main className="w-screen bg-grid">
      <div className="flex items-center justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="header">We're Only In It For The Money</h1>
      <p className="read-the-docs">
        what's the ugliest part of your body?
      </p>
    </main>
  )
}

export default Main;