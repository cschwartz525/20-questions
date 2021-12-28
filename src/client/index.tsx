import React, { ChangeEvent, useEffect, useState } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

const App = () => {
    const [socket, setSocket] = useState(null);
    const [text, setText] = useState('');
    const [sender, setSender] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = io('ws://localhost:3000');
        newSocket.open();
        setSocket(newSocket);
        return () => { newSocket.close() };
    }, [setSocket]);

    useEffect(() => {
        const messageListener = (message) => {
            setMessages([...messages, message]);
        };

        if (socket) {
            socket.on('message', messageListener);

            return () => {
                socket.off('message', messageListener);
            };
        }
    }, [messages, setMessages, socket]);

    const onButtonClick = (): void => {
        const message = { sender, text };
        setMessages([...messages, message]);
        socket.emit('message', message);
    };

    const onSenderChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSender(e.target.value);
    };

    const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value);
    };
    
    return (
        <div>
            <h1>Hello world</h1>
            <input
                onChange={onSenderChange}
                placeholder='Enter Your Name'
                type='text'
                value={sender}
            />
            <input
                onChange={onTextChange}
                placeholder='Enter Your Message'
                type='text'
                value={text}
            />
            <button onClick={onButtonClick}>SEND</button>
            {messages.map((message, index) => (
                <p key={`message_${index}`}>
                    <b>{message.sender}</b>: {message.text}
                </p>
            ))}
        </div>
    );
};

render(
    <App />,
    document.getElementById('root')
);