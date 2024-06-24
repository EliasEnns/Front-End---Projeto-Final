import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';

const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    telephone: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== '' && input.password !== '') {
      if (isRegistering) {
        if (input.password === input.confirmPassword) {
          const { confirmPassword, ...registerData } = input; // Exclude confirmPassword
          auth.registerAction(registerData);
        } else {
          alert('Passwords do not match');
        }
      } else {
        auth.loginAction(input);
      }
      return;
    }
    alert('Please provide valid input');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleRegister = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <>
      <h2 type="title">{isRegistering ? 'Register' : 'Login'}</h2>
      <div className="content">
        <form onSubmit={handleSubmitEvent}>
          <div>
            <label>
              Username:
              <input
                type="input"
                id="user-name"
                name="username"
                placeholder="maria"
                aria-describedby="user-name"
                aria-invalid="false"
                onChange={handleInput}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
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
          {isRegistering && (
            <>
              <div>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    aria-describedby="confirm-password"
                    aria-invalid="false"
                    onChange={handleInput}
                  />
                </label>
              </div>
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    aria-describedby="name"
                    aria-invalid="false"
                    onChange={handleInput}
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    aria-describedby="email"
                    aria-invalid="false"
                    onChange={handleInput}
                  />
                </label>
              </div>
              <div>
                <label>
                  Telephone:
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    placeholder="123456789"
                    aria-describedby="telephone"
                    aria-invalid="false"
                    onChange={handleInput}
                  />
                </label>
              </div>
            </>
          )}
          {isRegistering ? (
            <button type="submit" className="btn-submit">
              Register
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              Login
            </button>
          )}
          <button type="button" onClick={handleToggleRegister}>
            {isRegistering
              ? 'Already registered? Login now'
              : "Don't have a login? Register now"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
