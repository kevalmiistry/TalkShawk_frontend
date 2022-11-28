import { motion } from 'framer-motion'
import React from 'react'
import S from './ChatBox.module.scss'

const ChatBox: React.FC = () => {
    return (
        <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            transition={{ duration: 0.1 }}
            exit={{ translateX: '100%' }}
            className={S.chatbox_main}
        >
            ChatBox
        </motion.div>
    )
}

export default ChatBox
