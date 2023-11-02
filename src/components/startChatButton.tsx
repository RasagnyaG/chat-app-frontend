'use client'
import useSocket from "@/hooks/useSocket";
import "@/styles/chat.css"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";



const StartChatButton = ({ setNotFound, setStarted }: { setNotFound: Function, setStarted: Function }) => {

    const router = useRouter();
    // const socket = io("ws://localhost:8000");
    // const socketRef = useRef<Socket | null>(null);
    // socketRef.current = socket;

    const socket = useSocket()

    // event listeners
    socket?.on('matched', (chatRoomId) => {
        router.push("/" + chatRoomId)
    });

    socket?.on('error', (msg) => {
        console.log(msg);
        setNotFound(true);
    });

    const handlestartChat = () => {
        console.log("clicked")
        console.log(socket?.connected)
        if (socket?.connected) {
            // Emit the 'startChat' event
            socket.emit('startChat', Cookies.get("token"));
            console.log(socket)
            setStarted(true)
        }
        else setNotFound(true)
    };

    return (
        <button onClick={handlestartChat} className="start-chat-btn">Start A Chat</button>
    );
}

export default StartChatButton;
