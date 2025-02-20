import { Outlet } from "react-router-dom";
import Footer from "../components/Page/Footer";
import Header from "../components/Page/Header";

function Layout() {
  return (
    <>
      <header className="w-full flex justify-between flex-col items-center bg-white dark:bg-gray-700">
        <Header />
      </header>
      <main className="w-full grow-1 self-start flex items-center justify-center">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
