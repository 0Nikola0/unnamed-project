import React, { useEffect, useState } from 'react';

function Sidebar(props) {

    useEffect(() => {
    }, [props.chats])
    
    useEffect(() => {
    }, [props.currentChat])

    return (

        <div class="sidebar pe-3">
            <div class="sidebar-header pe-4 me-2">
                <h6 style={{ paddingInlineStart: "20px", fontWeight: "500", fontSize: "18px" }}>Разговори</h6>
                <i class="fas fa-plus new-chat pluscheto" onClick={() => {
                    props.createChat()
                }}></i>
            </div>

            <div class="container-fluid ps-2" style={{ overflowY: "auto", maxHeight: "90vh" }}>
                {props.chats.map((item, index) => {
                    item = JSON.parse(JSON.stringify(item));
                    return (
                        <a key={index} href="#" className={"ps-2 pe-0 " + (props.currentChat != null && props.currentChat == item._id ? " active " : "")}>
                            <span class="col-10 overflow-hidden" onClick={() => {
                                props.setCurrentChat(item._id)
                            }}>
                                {item.messages && item.messages[0] ? item.messages[0].content : "Empty chat"}
                            </span>
                            <i className="fas fa-trash-alt col-2 trashcan-icon" onClick={() => {
                                props.deleteChat(item._id)
                            }}></i>
                            {/* <i class="fas fa-ellipsis-h dot-menu col-2 "></i> */}
                        </a>
                    );
                })}
            </div>
        </div>

    )
}


export default Sidebar;