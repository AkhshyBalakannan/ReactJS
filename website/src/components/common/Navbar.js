import { Link } from "react-router-dom";
import routerLinks from "../../data/routerLinks";
import cart from '../../assets/icons/cart.svg'
import heart from '../../assets/icons/bookmark-heart.svg'
import projectName from '../../data/project'
import { user, logOutUser } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'



const Navbar = () => {

    const {
        HOME,
        SIGN_IN,
        SIGN_UP,
        PROFILE,
        MY_CART,
        WISH_LIST,
        MY_ORDER
    } = routerLinks

    const style = { 
        color: 'black',
        backgroundColor: '#E8C4C4',
        borderRadius: '8px',
        padding: '10px',
        textDecoration: 'None'
    }
    
    const titleStyle = {
        color: 'black',
        textDecoration: 'none',
        fontSize: 'xx-large',
        padding: '8px 0',
        fontWeight: 600
    }

    const logoutStyle = {
        ...style,
        cursor: 'pointer'
    }
    const users = useSelector(user)
    const dispatch = useDispatch()

    let wishListAlt = 'Wish List Icon'
    let myCartAlt = 'My Cart Icon'

    let authRouterLink = (
        users.userAuth ? (
            <>
                <Link to={PROFILE} style={style}>Profile</Link>
                <Link to={MY_ORDER} style={style}>My Orders</Link>
                <span onClick={() => dispatch(logOutUser(users))} style={logoutStyle}>Log Out</span>
            </>
        ) : (
            <>
                <Link to={SIGN_IN} style={style}>Sign In</Link>
                <Link to={SIGN_UP} style={style}>Sign Up</Link>
            </>
        )
    )

    return (
        <nav className="navbar">
            <>
                <Link to={HOME} style={titleStyle}>{projectName}</Link>
                <input className='search-bar' placeholder='Search'/>
            </>
            <div className="links">
                <Link to={HOME} style={style}>Home</Link>
                <Link to={WISH_LIST} style={style}><img src={heart} alt={wishListAlt}/> Wish List</Link>
                <Link to={MY_CART} style={style}><img src={cart} alt={myCartAlt}/> My Cart</Link>
                {authRouterLink}
            </div>
        </nav>
    );
}

export default Navbar;
