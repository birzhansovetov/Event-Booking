import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client"
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkResponse = await fetch(`http://localhost:3001/users?email=${formData.email}`);
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        alert("Пользователь с таким email уже существует");
        return;
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: Date.now().toString()
        }),
      });

      if (response.ok) {
        alert("Регистрация успешна! Теперь вы можете войти.");
        navigate("/login");
      } else {
        alert("Ошибка при регистрации");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при регистрации");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Роль:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="client">Клиент</option>
            <option value="organizer">Организатор</option>
          </select>
        </div>
        
        <button type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}