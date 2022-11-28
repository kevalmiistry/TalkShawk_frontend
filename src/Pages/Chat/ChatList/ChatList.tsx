import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Nav from '../../../Components/Nav/Nav'
import SearchBox from '../../../Components/SearchBox/SearchBox'
import SearchUserList from '../../../Components/SearchUserList/SearchUserList'
import ChatState from '../../../Context/ChatContext'
import ChatItem from './ChatItem/ChatItem'
import S from './ChatList.module.scss'

const ChatList: React.FC = () => {
    const [search, setSearch] = useState('')
    const [isSearchOnFocus, setIsSearchOnFocus] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const { user, chats, setChats } = ChatState()
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
            const { data } = await axios.get(url, config)
            // console.log(data, config)
            setChats(data)
        } catch (error) {}
    }
    useEffect(() => {
        if (search === '') {
            setSearchResults([])
        }
    }, [search])

    useEffect(() => {
        fetchChats()
    }, [])

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
                {chats?.map((c: SingleChatData) => (
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
