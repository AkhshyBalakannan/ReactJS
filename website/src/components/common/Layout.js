import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="App">
        <Navbar />
        <div className="content">
        <Outlet />
        </div>
    </div>
  )
};

export default Layout;
