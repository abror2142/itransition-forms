import { User } from "../types/User";

export function checkOwnerOrAdmin (formOwner: User, currentUser: User) {
    if(formOwner.id === currentUser.id || currentUser.roles.includes('ROLE_ADMIN')){
        return true;
    }
    return false
}