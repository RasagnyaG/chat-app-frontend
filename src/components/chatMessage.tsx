import React from 'react'
import "@/styles/chat.css"

const ChatMessage = ({ text }: { text: string }) => {
    return (
        <div className='chat-message'>
            {text}
        </div>
    )
}

export default ChatMessage
