import React from 'react'
import { getOppositeUser } from '../../../../ChatLogics/ChatLogics'
import ChatState from '../../../../Context/ChatContext'
import S from './ChatItem.module.scss'

type TProp = {
    chat: SingleChatData
}
const tempURL =
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
const ChatItem: React.FC<TProp> = ({ chat }) => {
    const { user } = ChatState()

    const name = chat.isGroupChat
        ? chat.chatName
        : getOppositeUser(chat.users, user!).name

    return (
        <li className={S.chatitem}>
            <img src={tempURL} alt="" />
            <div>
                <p className={S.name}>{name}</p>
                <p className={S.latest_msg}>
                    {chat?.latestMessage ? (
                        chat?.latestMessage.content
                    ) : (
                        <span>No latest Message!</span>
                    )}
                </p>
            </div>
        </li>
    )
}

export default ChatItem
