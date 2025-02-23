import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { useTheme } from './hooks/useTheme';
import "./utils/i18n/i18n";

function App() {
  const { isDarkMode }= useTheme();
 
  return (
    <div className={`${isDarkMode ? "dark" : ''} min-h-screen bg-indigo-50 text-gray-700 dark:bg-dark-bg dark:text-dark-text-highlighted flex flex-col justify-between items-center`}>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
