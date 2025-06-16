import { useState, useEffect } from "react";
import { api } from "./api/api.ts";
import { Navigate, useNavigate } from "react-router";
import Style from "./App.module.css";

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/dashboard");
      console.log(response.data);
    } catch (error) {
      setMessage(
        "Erro ao login: " +
          (error.response?.data?.message || "verifique seus dados")
      );
    }
  };

  return (
    <> 
      <div className={Style.wrapLogin}>
        <div className={Style.wrapImg}>
          <div className={Style.degrade}></div>
        </div>
        <div className={Style.wrapForm}>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div style={{position: 'relative', width: '100%'}}>
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p onClick={() => setShowPassword(prev => !prev)} style={{position: 'absolute', width: '20px', cursor: 'pointer', right: '10px', top: '9px'}}>👁</p>
            </div>
            <button type="submit">Entrar</button>
            <p className={Style.userCad} onClick={() => navigate("/usersCreate")}>Cadastrar usuário</p>
            <p>{message}</p>
          </form>
        </div>
      </div>
      </>
  )
};

export default App;
