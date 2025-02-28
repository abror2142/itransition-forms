import axios from "./axios";

export const BASE_URL = 'http://localhost:8000';

export const settings = {
    withCredentials: true,
}

export const URLs = (id?: number) => ({
    // AUTHENTICATION endpoints.
    LOGIN: BASE_URL + '/api/auth',
    LOGOUT: BASE_URL + '/api/token/invalidate',
    REGISTER: BASE_URL + '/api/register',
    VERIFY_EMAIL: BASE_URL + '/api/verify/email',
    TOKEN_REFRESH: BASE_URL + '/api/token/refresh',

    // USER
    USER_ME: BASE_URL + '/api/user',
    USER_UPDATE_IMAGE: BASE_URL + '/api/user/update/image',
    USER_UPDATE_INFO: BASE_URL + '/api/user/update/info',

    // FORM
    FORM_META_INFO: BASE_URL + '/api/form-meta',
    FORM_DETAIL: BASE_URL + `/api/form/${id}`,
    FORM_GIVE_ANSWER: BASE_URL + `/api/form/${id}/answer`,
    FORM_UPDATE: BASE_URL + `/api/form/${id}/update`,
    FORM_CREATE: BASE_URL + '/api/form-create',
    FORM_DELETE: BASE_URL + `/api/form/${id}/delete`,
    FORM_LIST_ALL: BASE_URL + '/api/form/all',

    // FORM ANALYTICS
    FORM_ANALYTICS: BASE_URL + `/api/form/${id}/analytics`,
    FORM_FILLINGS_BY_DATE: BASE_URL + `/api/form/${id}/fillings-by-date`,
    FORM_FILLINGS_TOTAL: BASE_URL + `/api/form/${id}/fillings-total`,
    FORM_CREATION_COUNT: BASE_URL + `/api/form-count/analytics`,

    // FORM COMMENTS
    FORM_COMMENTS_LIST_ALL: BASE_URL + `/api/form/${id}/comments`,  // GET
    FORM_COMMENT_CREATE: BASE_URL + `/api/form/${id}/comments`,  // POST

    // DASHBOARD
    DASHBOARD_ANSWERS: BASE_URL + '/api/dashboard/answers',
    DASHBOARD_FORMS: BASE_URL + '/api/dashboard/forms',
    DASHBOARD_USER_PROFILE: BASE_URL + '/api/dashboard/user/profile',

    // FORM LIKES
    FORM_LIKE_CREATE: BASE_URL + `/api/form/${id}/like/create`,
    FORM_LIKE_COUNT: BASE_URL + `/api/form/${id}/like/count`,
    FORM_LIKE_CHECK: BASE_URL + `/api/form/${id}/like/check`,

    // HOMEPAGE
    HOMEPAGE_DATA: BASE_URL + '/api/home',
    MY_FORMS: BASE_URL + '/api/home/my-forms',

    // SEARCH
    SEARCH: BASE_URL + '/api/search',
    SEARCH_META: BASE_URL + '/api/search/meta',

    // ADMIN page
    USERS_LIST: BASE_URL + '/api/users',    
    ACTION_ON_USERS: BASE_URL + '/api/admin/users',    
});

const CONTENT_TYPE_CONFIG = {
    withCredentials: settings.withCredentials,
    headers: {
        'Content-Type': 'application/json',
    }
}

const AUTH_CONTENT_TYPE_CONFIG = (authToken: string) => ({
    withCredentials: settings.withCredentials,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    }
})

const AUTH_CONFIG = (authToken: string) => ({
    withCredentials: settings.withCredentials,
    headers: {
        Authorization: `Bearer ${authToken}`,
    }
})

const addQuery = (url: string, query: string, value: string) => {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set(query, value);
    return parsedUrl.toString();
}

export const login = async (data: string) => {
    return axios.post(URLs().LOGIN, data, CONTENT_TYPE_CONFIG);
};

export const logout = async () => {
    return axios.get(URLs().LOGOUT);
}

export const register = async (data: string) => {
    return axios.post(URLs().REGISTER, data);
}

export const refreshToken = async () => {
    return axios.get(URLs().TOKEN_REFRESH);
}

export const verifyEmail = async (data: string) => {
    return axios.post(URLs().VERIFY_EMAIL, data, CONTENT_TYPE_CONFIG);
}

export const getUser = async (authToken: string) => {
    return axios.get(URLs().USER_ME, AUTH_CONFIG(authToken));
}

export const updateUserImage = async (authToken: string, data: string) => {
    return axios.post(URLs().USER_UPDATE_IMAGE, data, AUTH_CONTENT_TYPE_CONFIG(authToken));
}

export const updateUserInfo = async (authToken: string, data: string) => {
    return axios.post(URLs().USER_UPDATE_INFO, data, AUTH_CONTENT_TYPE_CONFIG(authToken));
}

export const getFormMetaInfo = async () => {
    return axios.get(URLs().FORM_META_INFO);
}

export const deleteForm = async (authToken: string, id: number) => {
    return axios.delete(URLs(id).FORM_DELETE, AUTH_CONTENT_TYPE_CONFIG(authToken));
}

export const sendFormAnswer = async (authToken: string, id: number, data: string) => {
    return axios.post(URLs(id).FORM_GIVE_ANSWER, data, AUTH_CONTENT_TYPE_CONFIG(authToken))
}

export const updateForm = async (authToken: string, id: number, data: string) => {
    return axios.put(URLs(id).FORM_UPDATE, data, AUTH_CONTENT_TYPE_CONFIG(authToken));
}

export const getFormListAll = async () => {
    return axios.get(URLs().FORM_LIST_ALL);
}

export const getFormDetail = async (id: number) => {
    return axios.get(URLs(id).FORM_DETAIL);
}

export const getFormAnalytics = async (id: number, authToken: string) => {
    return axios.get(URLs(id).FORM_ANALYTICS, AUTH_CONFIG(authToken));
}

export const getFormCountAnalytics = async (authToken: string) => {
    return axios.get(URLs().FORM_CREATION_COUNT, AUTH_CONFIG(authToken));
}

export const getFormFillingsByDate = async (id:number, authToken: string) => {
    return axios.get(URLs(id).FORM_FILLINGS_BY_DATE, AUTH_CONFIG(authToken));
}

export const getFormFillingsTotal = async (id: number, authToken: string) => {
    return axios.get(URLs(id).FORM_FILLINGS_TOTAL, AUTH_CONFIG(authToken));
}

export const getFormCommentsList = async (id: number) => {
    return axios.get(URLs(id).FORM_COMMENTS_LIST_ALL);
}

export const createFormComment = async (id: number, authToken: string, data: string) => {
    return axios.post(URLs(id).FORM_COMMENT_CREATE, data, AUTH_CONTENT_TYPE_CONFIG(authToken));
}

export const getDashboardAnswers = async (authToken: string, limit: string) => {
    const url = addQuery(URLs().DASHBOARD_ANSWERS, 'limit', limit)
    return axios.get(url, AUTH_CONFIG(authToken));
}

export const getDashboardForms = async (authToken: string, limit: string) => {
    const url = addQuery(URLs().DASHBOARD_FORMS, 'limit', limit)
    return axios.get(url, AUTH_CONFIG(authToken));
}

export const getDashboardUserProfile = async (authToken: string) => {
    return axios.get(URLs().DASHBOARD_USER_PROFILE, AUTH_CONFIG(authToken));
}

export const createFormLike = async (id: number, authToken: string) => {
    return axios.post(URLs(id).FORM_LIKE_CREATE, {}, AUTH_CONFIG(authToken));
}

export const createForm = async (data: string, authToken: string) => {
    return axios.post(URLs().FORM_CREATE, data, AUTH_CONTENT_TYPE_CONFIG(authToken));
}

export const getFormLikeCount = async (id: number) => {
    return axios.get(URLs(id).FORM_LIKE_COUNT);
}

export const getFormLikeCheck = async (id: number, authToken: string) => {
    return axios.get(URLs(id).FORM_LIKE_CHECK, AUTH_CONFIG(authToken));
}

export const getHomepageData = async () => {
    return axios.get(URLs().HOMEPAGE_DATA);
}

export const getMyForms = async (authToken: string) => {
    return axios.get(URLs().MY_FORMS, AUTH_CONFIG(authToken));
}

export const search = (term: string) => {
    return axios.get(URLs().SEARCH +`?q=${term}`);
}

export const getSearchMeta = () => {
    return axios.get(URLs().SEARCH_META);
}

export const getUsers = (url:string, authToken: string) => {
    return axios.get(BASE_URL + url, AUTH_CONFIG(authToken));
}

export const actOnUsers = (data: string, authToken: string) => {
    return axios.post(URLs().ACTION_ON_USERS, data, AUTH_CONTENT_TYPE_CONFIG(authToken));
}