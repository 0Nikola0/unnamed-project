import React, { useEffect, useState } from 'react';

const MessageForm = (props) => {
    const [formData, setFormData] = useState({ message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ message: '' });

        const userMessage = {
            "content": formData.message,
            "role": "user",
        };
        props.setMessages([...props.messages, userMessage])

        setLoading(true);

        // TODO smeni tuka CHATID
        const result = await props.doQuery(props.currentChat, formData.message);
        const queryResponse = {
            "role": "assistant",
            "content": result,
        }
        props.setMessages([...props.messages, userMessage, queryResponse])

        setLoading(false);
    };

    return (
        <div>
            {loading ? <div class="loader col-1 mb-5"></div> : null}
            <form onSubmit={handleSubmit} className='footer pb-4'>
                <div className="form-group">
                    <input
                        type="text"
                        autoComplete='off'
                        className="form-control"
                        id="message"
                        name="message"
                        required
                        placeholder="Постави прашање..."
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading || props.currentChat == null}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </form>
        </div>

    );
};

export default MessageForm;
