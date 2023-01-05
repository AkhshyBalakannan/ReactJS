import Home from './pages/Home';
import NotFound from './common/NotFound';
import ProductDetail from './pages/ProductDetail'
import MyCart from './pages/MyCart'
import WishList from './pages/WishList'
import MyOrder from './pages/MyOrder'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import Profile from './pages/Profile'
import Layout from './common/Layout';
import routerLinks from '../data/routerLinks'
import PrivateRoute from './auth/PrivateRoute'

import { Routes, Route } from "react-router-dom";


const Router = () => {

    const {
        HOME,
        SIGN_IN,
        SIGN_UP,
        PROFILE,
        PRODUCT,
        MY_CART,
        WISH_LIST,
        MY_ORDER,
        NOT_FOUND
    } = routerLinks

    return (
        <Routes>
            <Route path={HOME} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={SIGN_IN} element={<SignIn />} />
                <Route path={SIGN_UP} element={<SignUp />} />
                <Route path={PROFILE} element={
                        <PrivateRoute children={<Profile />} />
                    } />
                <Route path={PRODUCT}  element={<ProductDetail />} />
                <Route path={MY_CART}  element={<MyCart />} />
                <Route path={WISH_LIST}  element={<WishList />} />
                <Route path={MY_ORDER} element={
                        <PrivateRoute children={<MyOrder />} />
                    } />
                <Route path={NOT_FOUND}  element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default Router;
