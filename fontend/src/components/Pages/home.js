import React, { useState } from 'react';
import Sidebar from '../Chat/sidebar';
import Chat from '../Chat/chat';

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken, setAuthHeader } from '../../custom-axios/axios';
import MessageForm from '../Chat/message';


const HomePage = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AUTH TOKEN: " + getAuthToken())
        if (getAuthToken() === null || getAuthToken() === "null") {
            navigate("/login");
        }
        props.getChats();
    }, []);


    useEffect(() => {
        let _ = props.currentChat != null ? props.getMessages(props.currentChat) : null;
        props.getChats();
    }, [props.currentChat])


    return (

        <div class="row bg-podark pt-2">
            <div class="col-2 px-2">
                <Sidebar chats={props.chats}
                    getChats={props.getChats}
                    deleteChat={props.deleteChat}

                    currentChat={props.currentChat}
                    setCurrentChat={props.setCurrentChat}

                    createChat={props.createChat}
                />
            </div>

            <div class="main-content col-10">
                <div class="header row">
                    <h5 class="col-10">All knowing model</h5>
                    <div className="nav-item active col-2 ps-5 pe-0">
                        <Link title={"Logout"} className={"btn btn-outline-danger"}
                            onClick={() => {
                                setAuthHeader(null);
                            }}
                            to={"/login"}>
                            Logout
                        </Link>
                    </div>
                </div>
                {props.currentChat == null ?
                    <div className='' style={{ position: "absolute", top: "45%", left: "40%", zIndex: "4" }}>
                        <p>To start chatting, select one of your previous chats from the sidebar or</p>
                        <button className='btn btn-outline-info' style={{ width: "60%", marginLeft: "20%" }} onClick={() => {
                            props.createChat()
                        }}>Start a new chat</button>
                    </div> : <></>
                }

                <Chat messages={props.messages} />

                <MessageForm doQuery={props.doQuery}
                    messages={props.messages}
                    setMessages={props.setMessages}
                    currentChat={props.currentChat}
                />

            </div>


        </div >


    )

}


export default HomePage;