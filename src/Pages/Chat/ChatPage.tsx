import React, { FC } from 'react'
import ChatBox from './ChatBox/ChatBox'
import ChatList from './ChatList/ChatList'
import S from './ChatPage.module.scss'
import { isMobile } from 'react-device-detect'
import { AnimatePresence } from 'framer-motion'
import ChatState from '../../Context/ChatContext'
import { useNavigate } from 'react-router-dom'

const ChatPage: FC = () => {
    document.title = 'TalkShawk | Chats'
    const { user, setUser, selectedChat } = ChatState()
    const nev = useNavigate()
    React.useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('talkshawk_user')!)
        setUser(userInfo)

        if (!userInfo) {
            nev('/')
        } else {
            nev('/chat')
        }
        // eslint-disable-next-line
    }, [nev])
    return (
        <>
            {user && (
                <div className={`${S.chatpage_main}`}>
                    <ChatList />
                    {isMobile ? (
                        <AnimatePresence
                            initial={false}
                            onExitComplete={() => null}
                            exitBeforeEnter={true}
                        >
                            {selectedChat && <ChatBox />}
                        </AnimatePresence>
                    ) : (
                        <ChatBox />
                    )}
                </div>
            )}
        </>
    )
}

export default ChatPage
