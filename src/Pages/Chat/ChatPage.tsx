import React, { FC } from 'react'
import ChatBox from './ChatBox/ChatBox'
import ChatList from './ChatList/ChatList'
import S from './ChatPage.module.scss'
import { isMobile } from 'react-device-detect'
import { AnimatePresence } from 'framer-motion'
import ChatState from '../../Context/ChatContext'

const ChatPage: FC = () => {
    const [test, setTest] = React.useState(false)
    const { user } = ChatState()
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
                            {test && <ChatBox />}
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
