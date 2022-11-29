import React, { createContext, useContext, useState } from 'react'

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
    const [user, setUser] = useState<UserData | null>(null)
    const [selectedChat, setSelectedChat] = useState<SingleChatData | null>(
        null
    )
    const [chats, setChats] = useState([] as SingleChatData[])

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
