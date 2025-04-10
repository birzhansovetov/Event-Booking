import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShowEvents from "./pages/ShowEvents";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import ShowUsers from "./pages/ShowUsers";

export default function App() {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<ShowEvents />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ShowUsers />} />
      </Routes>
    </Router>
  );
}