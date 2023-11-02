
import React from 'react'

const Error = ({ message }: { message: string }) => {
    return (
        <div>
            <p style={{ color: "red", fontSize: 20, margin: 10 }}>{message}</p>
        </div>
    )
}

export default Error
