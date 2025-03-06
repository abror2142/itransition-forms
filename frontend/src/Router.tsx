import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import FormPage from "./containers/FormPage";
import HomePage from "./containers/HomePage";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";
import VerifyEmailPage from "./containers/VerifyEmailPage";
import AdminPage from "./containers/AdminPage";
import TemplatesPage from "./containers/TemplatesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { loader as FormLoader } from "./containers/FormPage";
import {loader as HomePageLoader} from "./containers/HomePage";
import FormUpdatePage, {loader as FormUpdatePageLoader} from "./containers/FormUpdatePage";
import FormProvider from "./providers/FormProvider";
import FormDetailPage, {loader as FormDetailPageLoader} from "./containers/FormDetailPage";
import AnalyticsPage from "./containers/AnaliticsPage";
import UsersTable from "./containers/UsersTable";
import FormsTable from "./containers/FormsTable";
import AdminLayout from "./hocs/AdminLayout";
import DashboardForms from "./containers/DashboardForms";
import DashboardAnswers from "./containers/DashboardAnswers";
import DashboardUserStats from "./containers/DashboardUserStats";
import UserProfileSettings from "./containers/UserProfileSettings";
import SearchPage from "./containers/SearchPage";
import DashboardSalesforce from "./containers/DashboardSalesforce";

const routes = createRoutesFromElements(
    <Route> 
        <Route path="/dashboard/" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_USER']} >
                <AdminLayout />
            </ProtectedRoute>
        }>
            <Route index element={<AdminPage />} />
            <Route path="users"  element={<UsersTable />} />
            <Route path="forms" element={<FormsTable />} />
            <Route path="profile" element={<UserProfileSettings />} />
            <Route path="user">
                <Route path="forms" element={<DashboardForms />} />
                <Route path="answers" element={<DashboardAnswers />} />
                <Route path="statistics" element={<DashboardUserStats />}/>
            </Route>
            <Route path="salesforce" element={<DashboardSalesforce />} />
            <Route 
                path="form/:id/analytics"
                element={<AnalyticsPage />}
            />
        </Route>
        
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} loader={HomePageLoader} />
            <Route path="form" element={<FormPage />} loader={FormLoader} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
        
            <Route path="templates" element={
                <ProtectedRoute allowedRoles={['ROLE_USER']}>
                    <TemplatesPage />
                </ProtectedRoute>
            } />

            <Route 
                path="form/edit/:id" 
                element={<FormProvider><FormUpdatePage /></FormProvider>}
                loader={FormUpdatePageLoader}
            />

            <Route
                path="form/:id"
                element={<FormDetailPage />}
                loader={FormDetailPageLoader}
            />
            
            </Route>
    </Route>
)

export const router = createBrowserRouter(routes);