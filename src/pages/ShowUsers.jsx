import { useState, useEffect } from "react";

export default function ShowUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          alert("Ошибка при загрузке пользователей");
        }
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Список пользователей</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email} — ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
