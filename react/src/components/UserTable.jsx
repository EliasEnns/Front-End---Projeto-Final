import classes from './ProductTable.module.css';

function UserTable({ users, deleteUser, editUser }) {
    return (
        <div className={classes.table_container}>
            <h2>Lista de Usuários</h2>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.telephone}</td>
                            <td className={classes.actions}>
                                <button onClick={() => editUser(user.id)}>Edit</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
