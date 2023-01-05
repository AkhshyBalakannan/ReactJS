import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import routerLinks from '../../data/routerLinks'
import { user, updateUser, signUpAsync, updateErrorMessage } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux';



const SignUp = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')

    const users = useSelector(user)
    const dispatch = useDispatch()

    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const {
        SIGN_IN,
        HOME
    } = routerLinks
    useEffect(() => {
        setError(users.errorMessage)
        if(users.id) {
            navigate(SIGN_IN, { replace: true })
        }
        if(users.userAuth) {
            navigate(HOME, { replace: true })
        }
    }, [users, navigate, HOME, SIGN_IN])

    const triggerAuth = async (e) => {
        e.preventDefault()
        const obj = {}
        obj['username'] = username
        obj['first_name'] = firstName
        obj['last_name'] = lastName
        obj['email'] = email
        dispatch(updateUser(obj))
        dispatch(signUpAsync(password))
    }

    useEffect(() => {
        setError(users.errorMessage)
    }, [users])

    useEffect(() => {
        dispatch(updateErrorMessage({}))
    }, [dispatch])

    return (
        <div className='auth-container signup'>
            <h2>Sign Up</h2>
            { error && <span className='error-message'>{error}</span>}
            <form onSubmit={triggerAuth}>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    placeholder='Enter your username here'
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                <label htmlFor='firstName'>First Name</label>
                <input
                    id='firstName'
                    placeholder='Enter your first name here'
                    onChange={(e)=>setFirstName(e.target.value)}
                    />
                <label htmlFor='lastName'>Last Name</label>
                <input
                    id='lastName'
                    placeholder='Enter your last name here'
                    onChange={(e)=>setLastName(e.target.value)}
                    />
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    placeholder='Enter your email here'
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    placeholder='Enter your password here'
                    type='password'
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <button className='auth-cta'>SIGN UP</button>
            </form>
            <p>Already have Account !! Try logging in &nbsp;
                <span>
                    <Link to={SIGN_IN}>SIGN IN</Link>
                </span>
            </p>
        </div>
        );
}

export default SignUp;
