import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import routerLinks from '../../data/routerLinks'

import { user, updateUser, signInAsync, updateErrorMessage } from '../../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'


const SignIn = () => {
    const users = useSelector(user)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {
        HOME,
        SIGN_UP
    } = routerLinks

    const triggerAuth = (e) => {
        e.preventDefault()
        const obj = {}
        obj['username'] = username
        dispatch(updateUser(obj))
        dispatch(signInAsync(password))
    }


    useEffect(() => {
        setError(users.errorMessage)
        if(users.userAuth) {
            navigate(HOME, { replace: true })
        }
    }, [users, HOME, navigate])

    useEffect(() => {
        dispatch(updateErrorMessage({}))
        setUsername(users.username)
    }, [dispatch, users.username])

    return (
        <div className='auth-container'>
            <h2>Sign In</h2>
            { error && <span className='error-message'>{error}</span>}
            <form onSubmit={triggerAuth}>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    placeholder='Enter your username here'
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    placeholder='Enter your password here'
                    type='password'
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <button className='auth-cta'>SIGN IN</button>
            </form>
            <p>Don't have Account !! Feel free to &nbsp;
                <span>
                    <Link to={SIGN_UP}>SIGN UP</Link>
                </span>
            </p>
        </div>
        );
}

export default SignIn;
