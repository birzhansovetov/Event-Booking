import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../AuthReducer"; 


function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        dispatch(login(user));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        alert("Неверный email или пароль");
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Ошибка при входе. Попробуйте позже.");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Вход в систему</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Войти</button>
    </form>
  );
}

export default Login;
