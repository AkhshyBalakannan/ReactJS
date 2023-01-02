import Home from './pages/Home';
import NotFound from './common/NotFound';
import ProductDetail from './pages/ProductDetail'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import Profile from './pages/Profile'
import Layout from './common/Layout';
import routerLinks from '../data/routerLinks'
import LogOut from './auth/LogOut';

import { Routes, Route } from "react-router-dom";


const Router = () => {

    const {
        HOME,
        SIGN_IN,
        SIGN_UP,
        PROFILE,
        PRODUCT,
        LOG_OUT,
        NOT_FOUND
    } = routerLinks

    return (
        <Routes>
            <Route path={HOME} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={SIGN_IN} element={<SignIn />} />
                <Route path={SIGN_UP} element={<SignUp />} />
                <Route path={PROFILE} element={<Profile />} />
                <Route path={PRODUCT}  element={<ProductDetail />} />
                <Route path={LOG_OUT}  element={<LogOut />} />
                <Route path={NOT_FOUND}  element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default Router;
