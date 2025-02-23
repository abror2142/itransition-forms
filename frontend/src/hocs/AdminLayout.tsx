import { Outlet, Link } from "react-router-dom";
import { faFileLines, faHome, faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../hooks/useAuth";

function AdminLayout() {
    const { user } = useAuth();
    return (
        <div className="h-screen w-full bg-white">
        <div className="flex justify-between items-center bg-indigo-50 px-8 py-3">
                    <p className="text-xl">Admin Panel</p>
                    <div className="flex items-center gap-2">
                        <div className="text-lg">
                            <FontAwesomeIcon icon={faUserCircle}/> 
                        </div>
                        <p>{user?.fullName}</p>
                    </div>
            </div>
            <div className="h-full grow-1 flex">
                    <div className="w-[250px] bg-indigo-50 px-4 pt-5">
                        <ul className="flex flex-col gap-1">
                            <li>
                                <Link to={"/admin"} className="flex items-center gap-2">
                                    <div className="w-[30px] h-[30px] flex items-center justify-center">
                                        <FontAwesomeIcon icon={faHome} />
                                    </div>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/users"} className="flex items-center gap-2">
                                    <div className="w-[30px] h-[30px] flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                    <p>Users</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/forms"} className="flex items-center gap-2">
                                <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600">
                                    <FontAwesomeIcon icon={faFileLines} />
                                </div>
                                <p>Forms</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white">
                        <Outlet />
                    </div>
                </div>
        </div>
    );
}

export default AdminLayout;
