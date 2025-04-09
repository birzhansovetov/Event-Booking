import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ShowEvents from "./ShowEvents";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import ShowUsers from "./ShowUsers";




export default function App() {
    const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<ShowEvents />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ShowUsers />} />
      </Routes>
    </Router>
  );
}
