import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { user } from '../../redux/userSlice'
import routerLinks from '../../data/routerLinks';

const PrivateRoute = ({ children }) => {
    // `useSelector((state: RootState) => state.user.userAuth)`
    const users = useSelector(user)
    const { SIGN_IN } = routerLinks
    if (!users.userAuth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to={SIGN_IN} />
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute
