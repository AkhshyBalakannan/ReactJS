import { Link } from "react-router-dom";
import routerLinks from "../../data/routerLinks";

const Navbar = () => {

    const {
        HOME,
        SIGN_IN,
        SIGN_UP,
        PROFILE,
        LOG_OUT
    } = routerLinks

    const style = { 
        color: 'black',
        backgroundColor: '#E8C4C4',
        borderRadius: '8px',
        padding: '10px',
        textDecoration: 'None'
    }
    
    const authUser = true

    let authRouterLink = (
        authUser ? (
        <span>
            <Link to={PROFILE} style={style}>Profile</Link>
            <Link to={LOG_OUT} style={style}>Log Out</Link>
        </span>
        ) : (
            <span>
                <Link to={SIGN_IN} style={style}>Sign In</Link>
                <Link to={SIGN_UP} style={style}>Sign Up</Link>
            </span>
        )
    )

    return (
        <nav className="navbar">
            <h1>AG's Ecommerce</h1>
            <input className='search-bar' placeholder='Search'/>
            <div className="links">
                <Link to={HOME} style={style}>Home</Link>
                {authRouterLink}
            </div>
        </nav>
    );
}

export default Navbar;
