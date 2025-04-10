import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (user) {
      fetch("http://localhost:3001/events")
        .then((res) => res.json())
        .then((data) => setEvents(data))
        .catch((err) => console.error("Ошибка загрузки событий:", err));
    }
  }, [user]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Добро пожаловать в Event Booking!</h1>

      {user ? (
        <>
          <p>Привет, {user.name || user.email} </p>
          <Link to="/dashboard">
            <button>Перейти в Личный кабинет</button>
          </Link>

          <h2 style={{ marginTop: "30px" }}>Все мероприятия:</h2>
          {events.map((event) => (
            <div key={event.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Дата: {event.date}</p>
              <p>Мест: {event.capacity}</p>
            </div>
          ))}
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

