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
    },

    getMessages: async (chatId) => {
        try {
            const response = await request("GET", `/api/chats/get?chatId=${chatId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    deleteChat: async (chatId) => {
        try {
            const response = await request("GET", `/api/chats/delete?chatId=${chatId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    query: async (chatId, message) => {
        try{
            const response = await request("POST", "/api/engine/query", {
                "chatId": chatId,
                "content": message
            })
            return response;
        } catch (error) {
            throw error;
        }
    },

    
}

export default BackendService;
