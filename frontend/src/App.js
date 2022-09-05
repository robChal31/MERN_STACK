import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="bg-stone-200 h-screen w-screen box-border">
      <BrowserRouter>
        <Navbar />
        <div className="mx-32">
          <Routes>
            <Route path={"/"} element={user ? <Home /> : <Login />} />
            <Route path={"/login"} element={user ? <Home /> : <Login />} />
            <Route path={"/signup"} element={user ? <Home /> : <Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
