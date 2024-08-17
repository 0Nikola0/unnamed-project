import React from 'react';
import ReactMarkdown from 'react-markdown';

const Chat = (props) => {

    return (
        <div className="conversation ms-4" style={{ paddingInline: "250px", minWidth: "75vw" }}>
            {props.messages.slice().reverse().map((item, index) => (
                <div key={index} className={"message " + JSON.parse(JSON.stringify(item)).role}>
                    <strong>{JSON.parse(JSON.stringify(item)).role}</strong>
                    <ReactMarkdown>{JSON.parse(JSON.stringify(item)).content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
}


export default Chat;