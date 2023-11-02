'use client'
import React, { useState } from 'react'
import StartChatButton from './startChatButton';
import TryAgain from './errors/tryAgain';


const StartChatPage = () => {

    const [notfound, setNotFound] = useState(false)
    const [start, setStart] = useState(false)

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Find someone to chat with...</h1>
            <StartChatButton setNotFound={setNotFound} setStarted={setStart} />
            {
                notfound && <TryAgain message='No match found' />
            }
            {
                start && !notfound && <p style={{ color: "white", fontSize: "30px", margin: "20px" }}> started searching....</p>
            }

        </div >
    )
}

export default StartChatPage
