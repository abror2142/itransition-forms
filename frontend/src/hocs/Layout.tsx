import { Outlet } from "react-router-dom";
import Footer from "../components/Page/Footer";
import Header from "../components/Page/Header";
import Ticket from "../components/Ticket";

function Layout() {
  return (
    <>
      <header className="w-full flex justify-between flex-col items-center bg-white dark:bg-dark-bg-contrast border-b border-b-dark-border">
        <Header />
      </header>
      <main className="w-full grow-1 self-start flex flex-col items-center justify-center">
        <Outlet />
      </main>
        <Ticket />
      <footer>  
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
