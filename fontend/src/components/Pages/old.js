import React from 'react';
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom';
import Sidebar from '../Chat/sidebar';
import { getAuthToken, setAuthHeader } from '../../custom-axios/axios';
import Chat from '../Chat/chat';


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const StarioMain = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AUTH TOKEN: " + getAuthToken())
        if (getAuthToken() == null || getAuthToken() == "null") {
            navigate("/login");
        }

        props.getMessages();
        props.getChats();
    }, [navigate]);


    return (
        
        <div class="row bg-podark">
            <div class="col-2 px-2">
                <Sidebar chats={props.chats} />
            </div>


            <div class="main-content col-10">
                <div class="header row">
                    <h5 class="col-10">Студентска служба</h5>
                    <div className="nav-item active col-2 ps-5">
                        <a title={"Logout"} className={"btn btn-outline-danger"}
                            onClick={() => {
                                setAuthHeader(null);
                                navigate("/login")
                            }}>
                            Logout
                        </a>
                    </div>
                </div>
                <div class="conversation">
                    <Chat messages={props.messages} />

                </div>
                <div class="footer">
                    <input type="text" class="form-control" placeholder="Type a message" />
                    <button class="btn btn-primary">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>

            </div>
        </div>
    )
}


export default StarioMain;