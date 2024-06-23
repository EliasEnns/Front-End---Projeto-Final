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
                <button className='NavButton'><Link to="/Products">Products</Link></button>
                <button className='NavButton'><Link to="/Dashboard">Dashboard</Link></button>
                <button className='NavButton' onClick={useAuth().logOut}>Logout</button>
            </div>
            <button className='Login'><Link to="/profile">{auth.user?.username}</Link></button>
        </div>
    );
}
export default NavBar;
