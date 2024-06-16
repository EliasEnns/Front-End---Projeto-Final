import React from 'react';
import { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import Popup from 'reactjs-popup';
import './Login.css';

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Popup
      trigger={<button className="button"> Login / Registrar </button>}
    >
      {close => (
        <div className="popup">
          <div className="popup-inner">
            <div>
            <button type='close' onClick={close}>
              ×
            </button>
            <h2 type='title' >Login</h2>
            </div>
            <div className="content">
              <form onSubmit={handleSubmitEvent}>
                <div>
                  <label>
                    Email:
                    <input 
                      type="input"
                      id="user-email"
                      name="username"
                      placeholder="you@woohoo.com"
                      aria-describedby="user-email"
                      aria-invalid="false"
                      onChange={handleInput} 
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Senha:
                    <input
                      type="password"
                      id="password"
                      name="password"
                      aria-describedby="user-password"
                      aria-invalid="false"
                      onChange={handleInput}
                    />
                  </label>
                </div>
                <button type="submit" className="btn-submit" >Login</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Login;