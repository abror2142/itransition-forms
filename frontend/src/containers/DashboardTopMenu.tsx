import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";
import LanguageSelect from "../components/Page/LanguageSelect";
import { Link } from "react-router-dom";

function DashboardTopMenu () {
    const { user } = useAuth();
    const { toggleDarkMode, isDarkMode } = useTheme();

    return (
        <div className="flex justify-between items-center bg-indigo-50 dark:bg-dark-blue px-8 py-3">
                <p className="text-xl">Admin Panel</p>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => toggleDarkMode()}
                        className="px-3 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-900 rounded-md"
                    >
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                    </button>
                    <LanguageSelect />
                    <div className="flex gap-2 items-center">
                        <div className="text-lg">
                            { 
                                user?.image
                                ? <img src={user?.image} className="rounded-full w-10 h-10 object-cover object-center"/>
                                : <FontAwesomeIcon icon={faUserCircle}/>
                            }
                        </div>
                        <p>{user?.fullName}</p>
                    </div>
                    <Link to={"/dashboard/salesforce"}>
                        Salesforce Account
                    </Link>
                </div>
        </div>
    )
}

export default DashboardTopMenu;