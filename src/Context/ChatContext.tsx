import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// type UserData = {
//     _id: string
//     name: string
//     email: string
//     password: string
//     pic: string
//     token: string
// }

type TChatContext = {
    user: UserData | null
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>
    selectedChat: any
    setSelectedChat: any
    chats: SingleChatData[]
    setChats: any
}

const ChatContext = createContext<TChatContext>({} as TChatContext)

type TProp = {
    children: React.ReactNode
}
export const ChatProvider: React.FC<TProp> = ({ children }) => {
    const nevigate = useNavigate()

    const [user, setUser] = useState<UserData | null>(null)
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([] as SingleChatData[])

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('talkshawk_user')!)
        setUser(userInfo)

        if (!userInfo) {
            nevigate('/')
        } else {
            nevigate('/chat')
        }
    }, [nevigate])

    return (
        <>
            <ChatContext.Provider
                value={{
                    user,
                    setUser,
                    selectedChat,
                    setSelectedChat,
                    chats,
                    setChats,
                }}
            >
                {children}
            </ChatContext.Provider>
        </>
    )
}

export default function ChatState() {
    return useContext(ChatContext)
}
