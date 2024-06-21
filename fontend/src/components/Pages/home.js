import React from 'react';
import Sidebar from '../Chat/sidebar';
import Chat from '../Chat/chat';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, setAuthHeader } from '../../custom-axios/axios';


const HomePage = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AUTH TOKEN: " + getAuthToken())
        if (getAuthToken() == null || getAuthToken() == "null") {
            navigate("/login");
        }
        
        props.getMessages();
        props.getChats();

        console.log("Helo helo")
    },[]);
    
    return (

        <div class="row bg-podark pt-2">


            <div class="col-2 px-2">

                <Sidebar chats={props.chats} />

            </div>


            <div class="main-content col-10">
                <div class="header row">
                    <h5 class="col-10">ChatGPT</h5>
                    <div className="nav-item active col-2 ps-5 pe-0">
                        <a title={"Logout"} className={"btn btn-outline-danger"}
                            onClick={() => {
                                setAuthHeader(null);
                                navigate("/login")
                            }}>
                            Logout
                        </a>
                    </div>
                </div>
                    <Chat messages={props.messages}/>

                <div class="footer pb-4">
                    <input type="text" class="form-control" placeholder="Type a message" />
                    <button class="btn btn-primary">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>


        </div >


    )

}


export default HomePage;