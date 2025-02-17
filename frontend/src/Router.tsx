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

const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} loader={HomePageLoader} />
        <Route path="form" element={<FormPage />} loader={FormLoader} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="admin" element={<AdminPage />} />
       
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
)

export const router = createBrowserRouter(routes);