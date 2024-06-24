import React from 'react'
import './ProductForm.css'


function UserForm({username, password, name, email, telephone, handleUsername, handlePassword, handleName, handleEmail,  handleTelephone, saveUser}) {
    return (
        <div className='container'>
            <h2>Cadastro de Produtos</h2>
            <form onSubmit={(e) => saveUser(e)}>
                <div>
                <label className='form-label' htmlFor="username">username:</label>
                <input className='form-input' value={username} type="text" name="username" onChange={(e) => handleUsername(e)} required/>
                </div>
                <div>
                <label className='form-label' htmlFor="password">password:</label>
                <input className='form-input' value={password} type="text" name="password" onChange={(e) => handlePassword(e)} required/>
                </div>
                <div>
                <label className='form-label' htmlFor="name">name:</label>
                <input className='form-input' value={name} type="text" name="name" onChange={(e) => handleName(e)} required/>
                </div>
                <div>
                <label className='form-label' htmlFor="email">email:</label>
                <input className='form-input' value={email} name="email" onChange={(e) => handleEmail(e)} required></input>
                </div>
                <div>
                <label className='form-label' htmlFor="telephone">telephone:</label>
                <input className='form-input' value={telephone} type="tel" name="telephone" onChange={(e) => handleTelephone(e)} required/>
                </div>
                <div>
                <input className='form-submit' type="submit" value="Cadastrar" />
                </div>
            </form>
        </div>
    )
}

export default UserForm