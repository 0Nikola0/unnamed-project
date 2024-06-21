import { request } from '../custom-axios/axios';

const BackendService = {
    getLogin: async (username, password) => {
        try {
            const response = await request("POST", "/login", {
                "login": username,
                "password": password
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    getRegister: async (firstName, lastName, username, password) => {
        try {
            const response = await request("POST", "/register", {
                "firstName": firstName,
                "lastName": lastName,
                "login": username,
                "password": password
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    getChats: async () => {
        try {
            const response = await request("GET", "/api/chats/get_all");
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default BackendService;
