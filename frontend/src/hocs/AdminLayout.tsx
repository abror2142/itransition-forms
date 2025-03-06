import { Outlet } from "react-router-dom";
import DashboardTopMenu from "../containers/DashboardTopMenu";
import DashboardSideMenu from "../containers/DashboardSideMenu";
import Ticket from "../components/Ticket";

function AdminLayout() {
    
    return (
        <div className="min-h-screen w-full bg-white dark:bg-dark-bg flex flex-col">
            <DashboardTopMenu />
            <div className="flex flex-1">
                <DashboardSideMenu />
                <div className="bg-white dark:bg-dark-bg grow-1 m-8">
                    <Outlet />
                </div>
                <Ticket />
            </div>
        </div>
    );
}

export default AdminLayout;
