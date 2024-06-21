import React from 'react';

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }
    render() {
        return (
            <div className="conversation ms-4" style={{ paddingInline: "250px", minWidth: "75vw" }}>
                {this.props.messages.slice().reverse().map((item, index) => (
                    <div key={index} className={"message " + item.role}>
                        <strong>{item.role}</strong>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Chat;