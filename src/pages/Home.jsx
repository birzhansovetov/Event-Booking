import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Добро пожаловать в Event Booking!</h1>

      {user ? (
        <>
          <p>Привет, {user.name || user.email} </p>
          <Link to="/dashboard">
            <button>Перейти в Личный кабинет</button>
          </Link>
        </>
      ) : (
        <>
          <p>Войдите или зарегистрируйтесь, чтобы бронировать мероприятия</p>
          <Link to="/login">
            <button style={{ margin: "5px" }}>Войти</button>
          </Link>
          <Link to="/register">
            <button style={{ margin: "5px" }}>Зарегистрироваться</button>
          </Link>
        </>
      )}
    </div>
  );
}

