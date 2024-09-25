import React, { createContext, useContext, useEffect, useState } from 'react'
import io from "socket.io-client";
const SocketContextData = createContext();

export const useSocketContext = () => {
    return useContext(SocketContextData);
};
const SocketProviders = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    console.log('socket', socketId)
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const socketConnect = io(`http://192.168.10.153:6050`, {
                auth: {
                    token: JSON.parse(localStorage.getItem("token")),
                }
            });//${data?.data?._id}
            setSocket(socketConnect);
            // socket.on("getOnlineUsers", (users) => {
            //     setOnlineUsers(users);
            // });
            socketConnect.on("connect", () => {
                setSocketId(socketConnect.id);
            });
            socketConnect.on("allAuction", (data) => {
                console.log('data',data)
            });
            return () => socketConnect.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [localStorage.getItem("token")]);
    const socketData = {
        socket
    }
    return <SocketContextData.Provider value={socketData}>{children}</SocketContextData.Provider>;
}

export default SocketProviders
