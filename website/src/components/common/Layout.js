import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import ClearCache from "../../utils/ClearCache"
import Modal from '../modals/Modal'


const Layout = () => {
  return (
    <div className="App">
        <Navbar />
        <div className="content">
        <Outlet />
        </div>
        <ClearCache />
        <Modal />
    </div>
  )
};

export default Layout;
