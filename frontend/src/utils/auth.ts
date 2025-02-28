import { User } from "../types/User";

export function isOwnerOrAdmin (formOwner: User, currentUser: User) {
    if(formOwner.id === currentUser.id || currentUser.roles.includes('ROLE_ADMIN')){
        return true;
    }
    return false
}

export function isAdmin (currentUser: User) {
    if(currentUser.roles.includes('ROLE_ADMIN')){
        return true;
    }
    return false
}

export function isUser (currentUser: User) {
    if(currentUser.roles.includes('ROLE_USER') && !currentUser.roles.includes('ROLE_ADMIN')){
        return true;
    }
    return false
}