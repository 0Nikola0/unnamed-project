import React, { useEffect } from 'react';

const Chat = (props) => {

    return (
        <div className="conversation ms-4" style={{ paddingInline: "250px", minWidth: "75vw" }}>
            {props.messages.slice().reverse().map((item, index) => (
                <div key={index} className={"message " + JSON.parse(JSON.stringify(item)).role}>
                    <strong>{JSON.parse(JSON.stringify(item)).role}</strong>
                    <p>{JSON.parse(JSON.stringify(item)).content}</p>
                </div>
            ))}
        </div>
    );
}


export default Chat;