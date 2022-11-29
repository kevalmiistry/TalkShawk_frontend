import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { getOppositeUser } from '../../../ChatLogics/ChatLogics'
import ChatState from '../../../Context/ChatContext'
import S from './ChatBox.module.scss'
import ChatSVG from './ChatSVG'

const ChatBox: React.FC = () => {
    const { user, selectedChat, setSelectedChat } = ChatState()
    let name: string = ''
    let pic: string = ''
    if (selectedChat && user) {
        name = selectedChat.isGroupChat
            ? selectedChat.chatName
            : getOppositeUser(selectedChat.users, user).name

        pic = selectedChat.isGroupChat
            ? selectedChat.groupPic
            : getOppositeUser(selectedChat.users, user).pic
    }

    return (
        <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            transition={{ duration: 0.1 }}
            exit={{ translateX: '100%' }}
            className={S.chatbox_main}
        >
            <AnimatePresence
                initial={false}
                onExitComplete={() => null}
                exitBeforeEnter={true}
            >
                {!selectedChat && (
                    <motion.div
                        className={S.svg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        exit={{ opacity: 0 }}
                    >
                        <div>
                            <ChatSVG />
                        </div>
                        <p>Click any of the chat to start chatting!</p>
                    </motion.div>
                )}
                {/*  */}
                {selectedChat && (
                    <div className={S.main_chat}>
                        <div className={S.chat_head}>
                            <div className={S.icon_pic_wrapper}>
                                <FontAwesomeIcon
                                    onClick={() => setSelectedChat(null)}
                                    className={S.back_icon}
                                    icon={faChevronLeft}
                                />
                                <img
                                    className={S.chat_pic}
                                    src={pic}
                                    alt="selected chat profile pic"
                                />
                                <p className={S.chat_name}>{name}</p>
                            </div>
                        </div>
                        <div className={S.chat_content}></div>
                        <div className={S.type_field}>
                            <input
                                onKeyDown={(e) => null}
                                type="text"
                                placeholder="Type in your message"
                                name="message"
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default ChatBox
