import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header () {
    return (
        <>
            <Navbar />
            <div className="flex items-center gap-4  text-sm font-semibold  text-gray-700 dark:text-gray-200 py-1">
                <Link to="/admin" className="px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800" >Admin</Link>
                <Link to="/templates" className="px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800" >My Forms</Link>
                <Link to="/form" className="px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800" >Create a Template</Link>
            </div>
        </>
    )
}

export default Header;