import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Добро пожаловать, {user.name}!</h1>
      <p>Ваша роль: <strong>{user.role}</strong></p>

      {user.role === "admin" && (
        <>
          <Link to="/users"><button>Список пользователей</button></Link>
          <Link to="/events"><button>Список мероприятий</button></Link>
        </>
      )}

      {user.role === "organizer" && (
        <>
          <Link to="/add-event"><button>Добавить мероприятие</button></Link>
          <Link to="/events"><button>Мои мероприятия</button></Link>
        </>
      )}

      {user.role === "client" && (
        <>
          <Link to="/events"><button>Посмотреть события</button></Link>
          <Link to="/my-bookings"><button>Мои бронирования</button></Link>
        </>
      )}
    </div>
  );
}

export default Dashboard;
