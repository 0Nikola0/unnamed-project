import React, { useState } from 'react';
import Sidebar from '../Chat/sidebar';
import Chat from '../Chat/chat';

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken, setAuthHeader } from '../../custom-axios/axios';
import MessageForm from '../Chat/message';
import InfoModal from '../Modals/infoModal';


const HomePage = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
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

                <InfoModal></InfoModal>

                <div class="header row">
                    <h4 class="col-10 fw-bold">Академус</h4>
                    <div className="nav-item active col-2 ps-5 pe-0">
                        <Link title={"Logout"} className={"btn btn-outline-danger"}
                            onClick={() => {
                                setAuthHeader(null);
                            }}
                            to={"/login"}>
                            Одјави се
                        </Link>
                    </div>
                </div>
                {props.currentChat == null ?
                    <div className='' style={{ position: "absolute", top: "45%", left: "40%", zIndex: "4" }}>
                        <p>За да разговараш со моделот, притисни на:</p>
                        <button className='btn btn-outline-info' style={{ width: "60%", marginLeft: "20%" }} onClick={() => {
                            props.createChat()
                        }}>Започни нов разговор</button>
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