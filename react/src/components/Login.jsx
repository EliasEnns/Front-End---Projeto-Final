import React from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import './Login.css';






function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    // Code to handle login goes here
    props.toggle();
  }
  return (
    <Popup
      trigger={<button className="button"> Login / Registrar </button>}
      modal
      nested
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
              <form onSubmit={handleLogin}>
                <div>
                  <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                  </label>
                </div>
                <div>
                  <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </label>
                </div>
                <button type="submit">Login</button>
              </form>
              <button onClick={props.toggle}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Login;