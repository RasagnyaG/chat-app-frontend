import React from 'react'
import "@/styles/globals.css"

const TryAgain = ({ message }: { message: string }) => {
    return (
        <div style={{ color: "red", margin: "20px", textAlign: "center", fontSize: "2rem" }}>
            <p>{message}</p>
            <p>Please retry after a while...</p>
        </div>


    )
}

export default TryAgain
