import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import {v4 as uuidv4} from 'uuid';
import '@fortawesome/fontawesome-free/css/all.min.css';

import BackendService from './repository/repository';
import { setAuthHeader } from './custom-axios/axios';

import Login from './components/Auth/login';
import HomePage from './components/Pages/home';
import Register from './components/Auth/register';


// TODO koa isteche auth tokeno avtomatski da go redirectne na login
function App() {
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    const doQuery = async (chatId, message) => {

        try {
            const response = await BackendService.query(chatId, message);
            return response.data
        } catch (error) {
            return false;
        }
    }

    const createChat = () => {
        setCurrentChat(uuidv4());
        getChats();
    }

    const deleteChat = (chatId) => {
        BackendService.deleteChat(chatId)
        .then(() => getChats())
    }

    const getChats = () => {
        BackendService.getChats()
            .then((data) => {
                setChats(JSON.parse(JSON.stringify(data.data)));
                // console.log("App.js getAllChats: ", data.data)
            })
    }

    const getMessages = async (chatId) => {
        try{
            const response = await BackendService.getMessages(chatId)
            // console.log("App.js getMessages: ", response.data)
            setMessages(response.data.messages)
        } catch (error) {
            return false;
        }
    }

    const doLogin = async (username, password) => {
        try {
            const response = await BackendService.getLogin(username, password);
            setAuthHeader(response.data.token);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    const doRegister = async (firstName, lastName, username, password) => {
        try {
            const response = await BackendService.getRegister(firstName, lastName, username, password)
            setAuthHeader(response.data.token);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    return (
        <Router>
            <main>
                <Routes>

                    <Route path="/login" element={
                        <Login onLogin={doLogin} />
                    } />

                    <Route path="/register" element={
                        <Register onRegister={doRegister} />
                    } />

                    <Route path="/" element={
                        <HomePage chats={chats}
                            getChats={getChats}
                            deleteChat={deleteChat}

                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                            createChat={createChat}

                            messages={messages}
                            setMessages={setMessages}
                            getMessages={getMessages}

                            doQuery={doQuery}
                        />
                    } />

                </Routes>
            </main>
        </Router>
    );
}

export default App;
