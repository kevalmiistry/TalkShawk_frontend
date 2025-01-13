import { motion } from 'framer-motion'
import React from 'react'
import UserItem from '../UserItem/UserItem'
import S from './SearchUserList.module.scss'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ChatState from '../../Context/ChatContext'
import axios from 'axios'

type TProp = {
    searchResults: UserData[]
}

const SearchUserList: React.FC<TProp> = ({ searchResults }) => {
    const [animationParent] = useAutoAnimate<HTMLUListElement>()

    const state = ChatState()
    const u = state.user
    const createOneonOneChat = async (_id: string) => {
        try {
            const config = {
                headers: {
                    'auth-token': u?.token,
                },
            }
            const url = import.meta.env.VITE_APP_API_URL + '/chat/create'
            const { data } = await axios.post(url, { userId: _id }, config)
            state.setFetchChatsAgain((p) => !p)
            state.setSelectedChat(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={S.searchuserlist_main}
        >
            <ul ref={animationParent}>
                {searchResults?.map((u: UserData) => (
                    <UserItem
                        key={u._id}
                        user={u}
                        handleFunction={() => createOneonOneChat(u._id)}
                    />
                ))}
            </ul>
        </motion.div>
    )
}

export default SearchUserList
