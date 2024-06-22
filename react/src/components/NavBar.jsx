import { Link } from 'react-router-dom';
import './NavBar.css'
import Login from './LoginButton'
import { useAuth } from '../hooks/AuthProvider';

function NavBar() {
    return (
        <div className='NavBar'>  
            <div className='NavButtons'>
                <button className='NavButton'><Link to="/">Home</Link></button>
                <button className='NavButton'><Link to="/Products">Products</Link></button>
                <button className='NavButton'><Link to="/Dashboard">Dashboard</Link></button>
                <button className='NavButton' onClick={useAuth().logOut}>Logout</button>
            </div>

            <div className='Login'><Login/></div>
        </div>
    );
}
export default NavBar;
