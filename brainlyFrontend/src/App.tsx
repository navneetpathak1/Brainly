import Dashboard from "./pages/Dashboard";
import ShareBrain from "./pages/ShareBrain";
import { SignIn } from "./pages/SignIN";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareId" element={<ShareBrain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
