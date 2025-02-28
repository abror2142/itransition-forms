import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../hooks/useTheme";
import { faArrowRightFromBracket, faFileLines, faMoon, faSun, faUserCircle, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LanguageSelect from "./LanguageSelect";
import SearchBar from "./SearchBar";
import { confirmAlert } from "react-confirm-alert";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = async () => {
      confirmAlert({
          title: t('confirmLogout'),
          message: t('confirmLogoutQuestion'),
          buttons: [
            {
              label: t('confirmYes'),
              onClick: async () =>{
                  // Send logout to backend
                  handleLogout();
                  return navigate('/');
              },
              className: "bg-red-500"
            },
            {
              label: t('confirmNo'),
              onClick: () => {}
            }
          ]
      })
  }

  return (
    <nav className="px-6 py-4 grid grid-cols-4 w-full items-center">
      <div className="flex items-start">
        <Link to={"/"} className="flex items-center dark:text-dark-accent gap-2">
          <FontAwesomeIcon icon={faFileLines}  className="text-3xl" />
          <p className="text-2xl">Forms</p>
        </Link>
      </div>

      <div
        className="col-span-2 flex items-center h-[40px] justify-center grow-1 
                        max-w-lg mx-auto w-full rounded-full"
      >
        <SearchBar />
      </div>

      <div className="flex gap-4 items-center grow-1 justify-end">
        <button
          onClick={() => toggleDarkMode()}
          className="px-3 py-1.5 border border-gray-200 dark:hover:bg-gray-600 dark:border-gray-900 rounded-md"
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>

        <LanguageSelect />

        {user == null ? (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-3 py-1 bg-gray-200 border dark:bg-dark-blue-light border-gray-200 dark:border-dark-border rounded-md"
            >
              {t('signInBtn')}
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 border dark:border-dark-border rounded-md"
            >
              {t('registerBtn')}
            </Link>
          </div>
        ) : (
          <div className="group relative">
            <div className="flex items-center bg-indigo-50 gap-2 pl-2 pr-4 py-1 rounded-full dark:bg-dark-blue border border-indigo-100 dark:border-dark-border">
              <div>
                { 
                  user 
                  && user?.image
                  ? <img src={user?.image} className="w-10 h-10 rounded-full" />
                  : <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
                }
              </div>
              <p>{user.fullName}</p>
            </div>
            <div className="hidden bg-indigo-50 border border-indigo-100 group-hover:flex flex-col gap-2 items-start absolute top-12 w-full dark:border-dark-border dark:bg-dark-blue px-4 py-2 rounded-md">
              <Link to="/dashboard" className="flex gap-2 items-center hover:bg-indigo-200 dark:hover:bg-dark-bg px-2 py-0.5 rounded-sm" 
              >Dashboard</Link>
              <Link to={"/dashboard/profile"} className="flex gap-2 items-center hover:bg-indigo-200 dark:hover:bg-dark-bg px-2 py-0.5 rounded-sm">
                <FontAwesomeIcon icon={faUserGear} />
                Profile
              </Link>
              <button
                onClick={logout}
                className="flex gap-2 items-center hover:bg-orange-500 px-2 py-0.5 rounded-sm"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                {t('logoutBtn')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
