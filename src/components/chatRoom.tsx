import useSocket from '@/hooks/useSocket'
import React, { useEffect, useState } from 'react'
import ChatMessage from './chatMessage'

const ChatRoom = ({ roomId }: { roomId: string }) => {

    const socket = useSocket()
    const [text, setText] = useState<string>('')
    const [messages, setMessages] = useState<{ isSent: string, text: string }[]>([])

    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    const handleSend = (e: any) => {
        e.preventDefault();
        socket?.emit("message", {
            text,
            senderSocketId: socket.id
        })
        setText('')
    }

    socket?.on("message", (message) => { console.log(messages), setMessages([...messages, message]) })

    useEffect(() => {
        // Retrieve messages from localStorage
        const storedMessages = localStorage.getItem(roomId);
        if (storedMessages) {
            const parsedMessages = JSON.parse(storedMessages);
            setMessages(parsedMessages);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(roomId, JSON.stringify(messages));
    }, [messages])

    return (
        <div className="chat-container" >
            <div className="chat-messages">
                {
                    messages.map((message, index) => {
                        console.log(messages[index].isSent)
                        return <div key={index} style={{ display: "flex", justifyContent: messages[index].isSent ? 'flex-end' : 'flex-start' }}>
                            <ChatMessage text={message.text} />
                        </div>
                    })
                }
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Type your message..."
                    onChange={handleChange} value={text}
                    onKeyDown={(event) => (event.key === "Enter") ? handleSend(event) : null}
                />
                <button onClick={handleSend}> Send</button>
            </div>
        </div >
    )
}

export default ChatRoom
