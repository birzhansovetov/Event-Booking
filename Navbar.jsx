import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./AuthReducer";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/"> Home</Link> &nbsp;|&nbsp;
      {user ? (
        <>
          <Link to="/dashboard">Панель</Link> &nbsp;|&nbsp;
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </nav>
  );
}

