import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Nav from '../../../Components/Nav/Nav'
import SearchBox from '../../../Components/SearchBox/SearchBox'
import SearchUserList from '../../../Components/SearchUserList/SearchUserList'
import UserSkeleton from '../../../Components/UserSkeleton/UserSkeleton'
import ChatState from '../../../Context/ChatContext'
import ChatItem from './ChatItem/ChatItem'
import S from './ChatList.module.scss'
import io, { Socket } from 'socket.io-client'

let socket: Socket
const ChatList: React.FC = () => {
    const [search, setSearch] = useState('')
    const [isSearchOnFocus, setIsSearchOnFocus] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [isChatsFetching, setIsChatsFetching] = useState(false)

    const {
        user,
        chats,
        setChats,
        fetchChatsAgain,
        setFetchChatsAgain,
        selectedChat,
        setIsSocketConnected,
    } = ChatState()

    useEffect(() => {
        if (user) {
            if (!process.env.REACT_APP_API_ENDPOINT)
                return console.error('ENDPOINT NOT AVAILABLE')

            socket = io(process.env.REACT_APP_API_ENDPOINT)
            socket.emit('online', user)
            socket.on('__online__', () => setIsSocketConnected(true))
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        socket.on(
            'commonMessageRecieved',
            (newMessage: TMessage, userID: string) => {
                if (userID !== user?._id) return

                if (selectedChat?._id !== newMessage.chat._id) {
                    setFetchChatsAgain((p) => !p)
                }
            }
        )
        // eslint-disable-next-line
    }, [])

    const onSearch = async (query: string) => {
        if (query === '') {
            setSearchResults([])
        } else {
            setIsSearching(true)
            const url = process.env.REACT_APP_API_URL + `/user/?search=${query}`
            const config = {
                headers: { 'auth-token': user?.token },
            }
            const { data } = await axios.get(url, config)
            setSearchResults(data.users)
            setIsSearching(false)
        }
    }

    const fetchChats = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + '/chat/fetch'
            const config = {
                headers: { 'auth-token': user?.token },
            }
            setIsChatsFetching(true)
            const { data } = await axios.get(url, config)
            setChats(data)
            setIsChatsFetching(false)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (search === '') {
            setSearchResults([])
        }
    }, [search])

    useEffect(() => {
        fetchChats()
        // eslint-disable-next-line
    }, [fetchChatsAgain])

    return (
        <div className={S.chatlist_main}>
            <Nav />
            <SearchBox
                search={search}
                setSearch={setSearch}
                isSearchOnFocus={isSearchOnFocus}
                setIsSearchOnFocus={setIsSearchOnFocus}
                onSearch={onSearch}
                isSearching={isSearching}
            />
            <div className={S.list}>
                {!chats && isChatsFetching ? <UserSkeleton /> : null}
                {!isChatsFetching &&
                    chats?.map((c: SingleChatData) => (
                        <ChatItem key={c._id} chat={c} />
                    ))}
                <AnimatePresence
                    initial={false}
                    onExitComplete={() => null}
                    exitBeforeEnter={true}
                >
                    {isSearchOnFocus && (
                        <SearchUserList searchResults={searchResults} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ChatList
