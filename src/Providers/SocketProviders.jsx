import React, { createContext, useContext, useEffect, useState } from 'react'
import io from "socket.io-client";
import { useGetNotificationQuery } from '../redux/api/manageApis';
const SocketContextData = createContext();

export const useSocketContext = () => {
    return useContext(SocketContextData);
};
const SocketProviders = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([])
    const [notificationLimit, setNotificationLimit] = useState(50)
    const { data: notificationsData, isLoading: isLoadingNotifications } = useGetNotificationQuery({ page: 1, limit: notificationLimit })
    const [newNotifications, setNewNotification] = useState(0)
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const socketConnect = io(`http://103.161.9.133:6050`, {
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
            socketConnect.on("notifications", (notification) => {
                // setNotifications(prev => [notification?.notifications, ...prev])
                setNewNotification(notification?.unseenCount)
                setNotifications(prev => [...notification?.notifications])
            });
            socketConnect.on("allAuction", (data) => {
                ('data', data)
            });
            socketConnect.on("bidHistory", (updatedBidHistory) => {
                ('updatedBidHistory', updatedBidHistory)
            })
            return () => socketConnect.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [localStorage.getItem("token")]);
    useEffect(() => {
        console.log('notificationsData?.data?.result', notificationsData?.data?.result)
        if (notificationsData?.data?.result) {
            setNotifications([...notificationsData?.data?.result])
        }
    }, [notificationsData?.data?.result])
    const socketData = {
        socket,
        notifications,
        setNotificationLimit,
        newNotifications
    }
    return <SocketContextData.Provider value={socketData}>{children}</SocketContextData.Provider>;
}

export default SocketProviders
