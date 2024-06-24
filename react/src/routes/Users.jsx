import { useState, useEffect } from 'react'

import './Services.css'
import UserTable from '../components/UserTable'
import UserForm from '../components/UserForm'

// CRUD COM JSON SERVER

function Services() {  
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [edit, setEdit] = useState(false);

  const url = 'http://localhost:3000/users';

  useEffect(() => {
    // Lista todos os usuários:
    const getUsersList = async() => {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    }

    getUsersList();

  }, []);

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setName("");
    setEmail("");
    setTelephone("");
  }

  // Busca apenas um usuário pelo seu id:
  const getUserById = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
    setUsername(data.username);
    setPassword(data.password);
    setName(data.name);
    setEmail(data.email);
    setTelephone(data.telephone);
    setId(data.id);

    // Habilita edição:
    setEdit(true);
  }

  const saveUser = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username, password, name, email, telephone })
    }

    // Cria url para buscar todos ou apenas um usuário
    const save_url = edit ? url + `/${id}` : url;

    // Faz a requisição http
    const res = await fetch(save_url, saveRequestParams);

    // Se for cadastro de usuário novo:
    if (!edit) { 
      const newUser = await res.json();
      // Atualização da tabela:
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    // Se for edição/atualização de usuário já cadastrado:
    if (edit) {       
      const editedUser = await res.json();
      // Atualização da tabela:
      const editedUserIndex = users.findIndex(user => user.id === id);
      users[editedUserIndex] = editedUser;
      setUsers(users);
    }

    clearForm();
    setEdit(false);
  }

  const deleteUser = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    });

    const deletedUser = await res.json();
    // Atualização da tabela:
    setUsers(users.filter(user => user.id !== deletedUser.id));
  }

  // Mudança dos estados ao digitar no formulário:
  const handleUsername = (e) => { setUsername(e.target.value) };
  const handlePassword = (e) => { setPassword(e.target.value) };
  const handleName = (e) => { setName(e.target.value) };
  const handleEmail = (e) => { setEmail(e.target.value) };
  const handleTelephone = (e) => { setTelephone(e.target.value) };

  return (
    <>
      <h2>CRUD com JSON Server</h2>
      <div>
        {
          users.length > 0 ? <UserTable users={users} deleteUser={deleteUser} editUser={getUserById} /> : <h3 style={{ marginBottom: '30px' }}>Nenhum usuário cadastrado...</h3>
        }
      </div>

      <UserForm
        username={username}
        password={password}
        name={name}
        email={email}
        telephone={telephone}
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        handleName={handleName}
        handleEmail={handleEmail}
        handleTelephone={handleTelephone}
        saveUser={saveUser}
      />
    </>
  )
}

export default Services
