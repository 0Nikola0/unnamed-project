import axios from 'axios';


export const getAuthToken = () => {
    return window.sessionStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.sessionStorage.setItem("auth_token", token);
    } else {
        window.sessionStorage.removeItem("auth_token");
    }
};

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = async (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }

    return await axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};