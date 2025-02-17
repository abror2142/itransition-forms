import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { useTheme } from './hooks/useTheme';


function App() {
  const { isDarkMode }= useTheme();
 
  return (
    <div className={`${isDarkMode ? "dark" : ''} min-h-screen bg-indigo-50 text-gray-700 dark:bg-gray-950 dark:text-white flex flex-col justify-between items-center`}>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
