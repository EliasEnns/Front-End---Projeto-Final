import { Link } from 'react-router-dom';

import Login from './Login'

function NavBar() {
    return (
        <div>
            <span style={{padding: '10px'}}><Link to="/Home">Home</Link></span>
            <span style={{padding: '10px'}}><Link to="/Products">Products</Link></span>
            <Login/>

        </div>
    );
}
export default NavBar;
