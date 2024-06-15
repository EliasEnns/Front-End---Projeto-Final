import React from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';

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
        <div className="modal">
          <button className="close" onClick={close}>
            ×
          </button>

          <h2>Login</h2>

          <div className="content">
            
            <form onSubmit={handleLogin}>
              <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </label>
              <button type="submit">Login</button>
            </form>
            <button onClick={props.toggle}>Close</button>
          </div>
          <div className="actions">
            <Popup
              trigger={<button className="button"> Trigger </button>}
              position="top center"
              nested
            >
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                magni omnis delectus nemo, maxime molestiae dolorem numquam
                mollitia, voluptate ea, accusamus excepturi deleniti ratione
                sapiente! Laudantium, aperiam doloribus. Odit, aut.
              </span>
            </Popup>
            <button
              className="button"
              onClick={() => {
                console.log('modal closed ');
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Login;