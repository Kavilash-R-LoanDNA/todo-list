import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5160/api/login", {
      username: username,
      password: password,
    });

    const token = res.data.token;
    localStorage.setItem("token",token);
    navigate("/");

    if (res.status === 200) {
      alert("Login successful");
      // Redirect to home or perform other actions
    } else {
      alert("Login failed");
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        {/* login-header */}
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <div>
          <form onSubmit={handleLogin} action="post" className="login-form">
            <div>
              <div>
                <label htmlFor=""></label>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                />
              </div>
              <div>
                <label htmlFor=""></label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
            {/*  */}
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
