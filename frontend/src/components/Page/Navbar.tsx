import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../hooks/useTheme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";
import SearchBar from "./SearchBar";

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="dark:bg-gray-800 px-6 py-4 grid grid-cols-4 w-full items-center">
      <Link to={"/"} className="">
        <div className="bg-gray-200 w-30 h-10 dark:bg-gray-600 rounded-md flex items-center justify-center">
          {" "}
          {t('welcomeMessage')}
        </div>
      </Link>

      <div
        className="col-span-2 flex items-center h-[40px] justify-center grow-1 
                        max-w-lg mx-auto w-full rounded-full"
      >
        <SearchBar />
      </div>

      <div className="flex gap-3 items-center grow-1 justify-end">
        <button
          onClick={() => toggleDarkMode()}
          className="px-3 py-1.5 border border-gray-200 dark:hover:bg-gray-600 dark:border-gray-900 rounded-md"
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
        <LanguageSelect />
        {user == null ? (
          <div>
            <Link
              to="/login"
              className="px-3 py-1.5 bg-gray-200 dark:bg-orange-500 border border-gray-200 dark:border-orange-500 rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-3 py-1.5 border border-orange-500 rounded-md"
            >
              Register
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="px-3 py-1.5 bg-gray-200 dark:bg-orange-500 border border-gray-200 dark:border-orange-500 rounded-md"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
