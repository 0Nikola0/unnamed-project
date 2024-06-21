import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Routes, useNavigate } from 'react-router-dom'
import BackendService from './repository/repository';

import { request, setAuthHeader, getAuthToken } from './custom-axios/axios';
import Login from './components/Auth/login';
import Register from './components/Auth/register';


import HomePage from './components/Pages/home';
import '@fortawesome/fontawesome-free/css/all.min.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            messages: [],
            selectedBook: {}
        }
    }

    render() {

        return (
            <Router>
                <main>
                    <Routes>

                        <Route path="/login" element={
                            <Login onLogin={this.doLogin} />
                        } />

                        <Route path="/register" element={
                            <Register onRegister={this.doRegister} />
                        } />

                        <Route path="/" element={
                            <HomePage chats={this.state.chats}
                                messages={this.state.messages}
                                getMessages={this.getMessages}
                                getChats={this.getAllChats} />
                        } />

                    </Routes>
                </main>
            </Router>
        );
    }

    componentDidMount() {

    }

    getAllChats = () => {
        // console.log("Called getAllChats")
        // LabService.getChats()
        //     .then((data) => {
        //         console.log("get all chats api")
        //         console.log(data);
        //         // this.setState({
        //         //     chats: data.data
        //         // })
        //     })
        this.setState({
            chats: [{ "name": "Rewrite this SQL code to Python", "key": 1, },
            { "key": 2, "name": "What is the capital city of Macedonia?", }]
        })
    }

    getMessages = () => {
        this.setState({
            messages: [
                { "content": "How can i help you sir", "role": "assistant", "key": 1 },
                { "content": "What is the capital city of Macedonia?", "role": "user", "key": 2 },
                { "content": "The capital city of Macedonia is Sopje", "role": "assistant", "key": 3 },
                { "content": "Thank you", "role": "user", "key": 4 }
            ]
        })
    }

    doLogin = async (username, password) => {
        try {
            const response = await BackendService.getLogin(username, password);
            setAuthHeader(response.data.token);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    doRegister = async (firstName, lastName, username, password) => {
        try {
            const response = await BackendService.getRegister(firstName, lastName, username, password)
            setAuthHeader(response.data.token);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}

export default App;
