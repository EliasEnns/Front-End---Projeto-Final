import { Link } from 'react-router-dom';
import './NavBar.css'
import Login from './LoginButton'
import { useAuth } from '../hooks/AuthProvider';

function NavBar() {
    const auth = useAuth();
    return (
        <div className='NavBar'>  
            <div className='NavButtons'>
                <button className='NavButton'><Link to="/">Home</Link></button>
                <button className='NavButton'><Link to="/Services">Services</Link></button>
                {auth.user?.username === 'Admin' ? (
                    <button className='NavButton'><Link to="/Users">Users</Link></button>
                ) : (
                    <button className='NavButton' onClick={() => alert('Access Denied')}>Access Denied</button>
                )}
                <button className='NavButton' onClick={useAuth().logOut}>Logout</button>
            </div>
            <button className='Login'><Link to="/profile">{auth.user?.username}</Link></button>
        </div>
    );
}
export default NavBar;
