import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faFileLines, faFileCircleCheck, faSquarePollVertical, faArrowLeft, faUserGear, faTicket, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { isAdmin, isUser } from "../utils/auth";

function DashboardSideMenu () {
    const { user } = useAuth();
    return (
        <div className="w-[250px] bg-indigo-50 dark:bg-dark-blue px-4 pt-5 flex justify-between flex-col">
            <ul className="flex flex-col gap-1">
                <li>
                    <Link to={"/dashboard"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                        <div className="w-[30px] h-[30px] flex items-center justify-center">
                            <FontAwesomeIcon icon={faHome} />
                        </div>
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link to={"/dashboard/profile"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                        <div className="w-[30px] h-[30px] flex items-center justify-center">
                            <FontAwesomeIcon icon={faUserGear} />
                        </div>
                        <p>Profile</p>
                    </Link>
                </li>
                {   user
                    && isAdmin(user)
                    && <li>
                        <Link to={"/dashboard/users"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                            <div className="w-[30px] h-[30px] flex items-center justify-center">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <p>Users</p>
                        </Link>
                    </li>
                }
                {   user
                    && isAdmin(user)
                    && <li>
                        <Link to={"/dashboard/forms"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                            <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600">
                                <FontAwesomeIcon icon={faFileLines} />
                            </div>
                            <p>Forms</p>
                        </Link>
                    </li>
                }
                {   user
                    && isUser(user)
                    && <li>
                        <Link to={"/dashboard/user/forms"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                            <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600">
                                <FontAwesomeIcon icon={faFileLines} />
                            </div>
                            <p>My Forms</p>
                        </Link>
                    </li>
                }
                {   user
                    && isUser(user)
                    && <li>
                        <Link to={"/dashboard/user/answers"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                            <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600">
                                <FontAwesomeIcon icon={faFileCircleCheck} />
                            </div>
                            <p>Answers</p>
                        </Link>
                    </li>
                }
                {   user
                    && isUser(user)
                    && <li>
                        <Link to={"/dashboard/user/statistics"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                            <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600">
                                <FontAwesomeIcon icon={faSquarePollVertical} className="text-2xl"/>
                            </div>
                            <p>Statistics</p>
                        </Link>
                    </li>
                }
                <li>
                    <Link to={"/dashboard/tickets"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                        <div className="w-[30px] h-[30px] flex items-center justify-center text-amber-400">
                            <FontAwesomeIcon icon={faTicket} className="text-xl"/>
                        </div>
                        <p>My Tickets</p>
                    </Link>
                </li>
                <li>
                    <Link to={"/dashboard/odoo"} className="flex items-center gap-2 dark:hover:bg-dark-bg px-2 py-1 rounded-md">
                        <div className="w-[30px] h-[30px] flex items-center justify-center text-amber-400">
                            <FontAwesomeIcon icon={faFileImport} className="text-xl"/>
                        </div>
                        <p>Export to Odoo</p>
                    </Link>
                </li>
            </ul>
            <Link to={"/"} className="px-4 py-1 bg-white dark:bg-dark-blue-light dark:text-dark-text-highlighted rounded-md mx-auto mb-4">
                <FontAwesomeIcon icon={faArrowLeft} /> Home
            </Link>
        </div>
    )
}

export default DashboardSideMenu;