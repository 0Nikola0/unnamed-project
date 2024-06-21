import React from 'react';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {

        // tuka deka so dodavame racno za dali da ima 'active' klasa ne zabravaj prazno mesto da ima prethodno
        return (


            <div class="sidebar pe-3">
                <div class="sidebar-header pe-4 me-2">
                    <h6 style={{ paddingInlineStart: "20px", fontWeight: "500", fontSize: "18px" }}>Previous chats</h6>
                    <i class="fas fa-plus new-chat pluscheto"></i>
                </div>

                <div class="container-fluid ps-2" style={{ overflowY: "auto", maxHeight: "90vh" }}>
                {this.props.chats.map((item, index) => (
                    <a key={index} href="#" class="ps-2 pe-0">
                    <span class="col-10 overflow-hidden">{item.name}</span>
                    <i class="fas fa-ellipsis-h dot-menu col-2 "></i>
                </a>
                ))}

                </div>
            </div>

        )
    }
}

export default Sidebar;