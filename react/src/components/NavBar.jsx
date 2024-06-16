import { Link } from 'react-router-dom';
import './NavBar.css'
import Login from './Login'

function NavBar() {
    return (
        <div className='NavBar'>  
            <div classname='NavButtons'>
            <button className='NavButton'><Link to="/">Home</Link></button>
            <button className='NavButton'><Link to="/Products">Products</Link></button>
            </div>

            <div className='Login'><Login/></div>
            

        </div>
    );
}
export default NavBar;
