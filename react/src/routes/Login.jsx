import React from 'react';
import { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';


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
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
<>

        <h2 type='title' >Login</h2>
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

      </>
  );
};

export default Login;
