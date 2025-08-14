import {Outlet} from "react-router-dom";
import Header from "../Header/Header";

function Layout() {
    return (
        <>
            <Header/>
            <div className="flex justify-center">
            <Outlet/>
            </div>
        </>
    )
}

export default Layout;