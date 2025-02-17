import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: [];
}

function ProtectedRoute ({ allowedRoles, children }: ProtectedRouteProps) {
    const { user } = useAuth();

    if (user === undefined) {
        return <div>Loading...</div>;
    }

    if (user === null) {
        return <div>You are not Authenticated!</div>;
    }

    if (allowedRoles && !allowedRoles?.some(allowedRole => user.roles.includes(allowedRole))){
        return <div>You don't have Permission to see this page!</div>;
    }

    return children;
}

export default ProtectedRoute;