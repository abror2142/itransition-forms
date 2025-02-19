import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../hooks/useAuth";

function Header () {
    const { user } = useAuth();
    return (
        <>
            <Navbar />
                {user ? 
                    <div className="flex items-center gap-4  text-sm font-semibold  text-gray-700 dark:text-gray-200 py-1">
                        <Link to="/admin" className="px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800" >Admin</Link>
                        <Link to="/dashboard" className="px-2 py-1 text-blue-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800" >Dashboard</Link>
                    </div> : null
                }
        </>
    )
}

export default Header;