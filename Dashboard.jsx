import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    capacity: 0
  });
  

  useEffect(() => {
    if (user?.role === "admin") {
      fetch("http://localhost:3001/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }

    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));

    if (user?.role === "client") {
      fetch(`http://localhost:3001/bookings?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, [user]);

  const handleBooking = async (eventId, quantity) => {
    const response = await fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.id,
        eventId,
        quantity
      })
    });

    if (response.ok) {
      const newBooking = await response.json();
      setBookings([...bookings, newBooking]);
      alert("Успешно забронировано!");
    } else {
      alert("Ошибка при бронировании.");
    }
  };

  const handleCancelBooking = async (id) => {
    await fetch(`http://localhost:3001/bookings/${id}`, {
      method: "DELETE"
    });
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const getEventById = (id) => events.find((e) => e.id === id);

  const handleDeleteUser = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE"
    });
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleDeleteEvent = async (id) => {
    await fetch(`http://localhost:3001/events/${id}`, {
      method: "DELETE"
    });
    setEvents(events.filter((e) => e.id !== id));
  };
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newEvent,
        organizerId: user.id
      })
    });
  
    if (response.ok) {
      const created = await response.json();
      setEvents([...events, created]);
      setNewEvent({ title: "", description: "", date: "", capacity: 0 });
      alert("Мероприятие успешно создано!");
    } else {
      alert("Ошибка при создании.");
    }
  };
  

  const myEvents = events.filter((e) => e.organizerId === user?.id);

  if (!user) return <p>Нет доступа</p>;

  return (
    <div>
      <h1>Панель управления ({user.role})</h1>
      <p>Здравствуйте, {user.name}!</p>

      {user.role === "admin" && (
        <>
          <h2>Пользователи</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    {u.id !== user.id && (
                      <button onClick={() => handleDeleteUser(u.id)}>Удалить</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {user.role === "organizer" && (
        <>
          <h2>Мои мероприятия</h2>
          {myEvents.map((event) => (
            <div key={event.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Дата: {event.date}</p>
              <button onClick={() => handleDeleteEvent(event.id)}>Удалить</button>
            </div>
          ))}
          <h2>Создать мероприятие</h2>
<form onSubmit={handleCreateEvent}>
  <input
    type="text"
    placeholder="Название"
    value={newEvent.title}
    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
    required
  />
  <br />
  <textarea
    placeholder="Описание"
    value={newEvent.description}
    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
    required
  />
  <br />
  <input
    type="date"
    value={newEvent.date}
    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
    required
  />
  <br />
  <input
    type="number"
    placeholder="Количество мест"
    value={newEvent.capacity}
    onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })}
    required
  />
  <br />
  <button type="submit">Создать</button>
</form>


          <h2>Все мероприятия</h2>
          {events.map((event) => (
            <div key={event.id} style={{ border: "1px dashed gray", margin: 10, padding: 10 }}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          ))}
        </>
      )}

      {user.role === "client" && (
        <>
          <h2>Все мероприятия</h2>
          {events.map((event) => (
            <div key={event.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Дата: {event.date}</p>
              <p>Мест: {event.capacity}</p>
              <button onClick={() => handleBooking(event.id, 1)}>Забронировать</button>
            </div>
          ))}

          <h2>Мои бронирования</h2>
          {bookings.map((booking) => {
            const event = getEventById(booking.eventId);
            return (
              <div key={booking.id} style={{ border: "1px dashed green", margin: 10, padding: 10 }}>
                <p><strong>Событие:</strong> {event?.title}</p>
                <p><strong>Количество мест:</strong> {booking.quantity}</p>
                <button onClick={() => handleCancelBooking(booking.id)}>Отменить</button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
