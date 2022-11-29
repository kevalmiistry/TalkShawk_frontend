import axios from 'axios'
import React from 'react'
import ChatState from '../../Context/ChatContext'
import S from './UserItem.module.scss'

type TProp = {
    user: UserData
}
const UserItem: React.FC<TProp> = ({ user }) => {
    const state = ChatState()
    const u = state.user
    const createOneonOneChat = async (_id: string) => {
        try {
            const config = {
                headers: {
                    'auth-token': u?.token,
                },
            }
            const url = process.env.REACT_APP_API_URL + '/chat/create'
            const { data } = await axios.post(url, { userId: _id }, config)
            state.setFetchChatsAgain((p) => !p)
            state.setSelectedChat(data)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <li className={S.useritem} onClick={() => createOneonOneChat(user._id)}>
            <img src={user.pic} alt="" />
            <div>
                <p className={S.name}>{user.name}</p>
                <p className={S.username}>@{user.username}</p>
            </div>
        </li>
    )
}

export default UserItem
