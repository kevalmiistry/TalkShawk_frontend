import { FC, useState, useEffect } from 'react'
import { faCaretRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'
import { getOppositeUser } from '../../../../ChatLogics/ChatLogics'
import GroupInfo from '../../../../Components/GroupInfo/GroupInfo'
import LocalOverLay from '../../../../Components/LocalOverLay/LocalOverLay'
import ChatState from '../../../../Context/ChatContext'
import thin_spinner from '../../../../Assets/thin_spinner.gif'
import { ToastState } from '../../../../Context/ToastContext'
import ScollableChat from './ScollableChat/ScollableChat'
import S from './SingleChat.module.scss'
import axios from 'axios'

type TProp = {}
const SingleChat: FC<TProp> = () => {
    const { user, selectedChat, setSelectedChat } = ChatState()
    const { showToast } = ToastState()

    const [isGrpModalOpen, setIsGrpModalOpen] = useState(false)

    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messages, setMessages] = useState<TMessage[]>([])
    const [newMessageToSend, setNewMessageToSend] = useState('')

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

    const fetchMessages = async () => {
        try {
            setIsMessagesLoading(true)
            const url =
                process.env.REACT_APP_API_URL + `/message/${selectedChat?._id}`
            const config = {
                headers: { 'auth-token': user?.token },
            }
            const { data } = await axios.get(url, config)
            setMessages(data)
            setIsMessagesLoading(false)
        } catch (error) {
            showToast({
                message: 'Something went wrong!',
                show: true,
                status: 'error',
            })
        }
    }

    const handleSendMessage = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            try {
                const url = process.env.REACT_APP_API_URL + `/message/create`
                const config = { headers: { 'auth-token': user?.token } }
                const dataToSend = {
                    chatId: selectedChat?._id,
                    content: newMessageToSend,
                }
                const { data } = await axios.post(url, dataToSend, config)
                setMessages((prev: TMessage[]) => [...prev, data])
                setNewMessageToSend('')
            } catch (error) {
                showToast({
                    message: 'Something went wrong!',
                    show: true,
                    status: 'error',
                })
            }
        }
    }

    useEffect(() => {
        fetchMessages()
        // eslint-disable-next-line
    }, [selectedChat])

    return (
        <>
            <div className={S.main_chat}>
                <div className={S.chat_head}>
                    <div className={S.icon_pic_wrapper}>
                        <FontAwesomeIcon
                            onClick={() => setSelectedChat(null)}
                            className={S.back_icon}
                            icon={faChevronLeft}
                        />
                        <div
                            className={S.name_wrapper}
                            onClick={() => setIsGrpModalOpen(true)}
                        >
                            <img
                                className={S.chat_pic}
                                src={pic}
                                alt="selected chat profile pic"
                            />
                            <p className={S.chat_name}>{name}</p>
                            {selectedChat?.isGroupChat && (
                                <FontAwesomeIcon icon={faCaretRight} />
                            )}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className={S.chat_content}>
                    <div className={S.chat_overflow_wrapper}>
                        {isMessagesLoading ? (
                            <div className={S.message_loading}>
                                <img
                                    src={thin_spinner}
                                    className={S.loading_img}
                                    alt=""
                                />
                            </div>
                        ) : (
                            <ScollableChat messages={messages} />
                        )}
                    </div>
                </div>
                {/*  */}
                <div className={S.type_field}>
                    <input
                        onKeyDown={handleSendMessage}
                        onChange={(e) => setNewMessageToSend(e.target.value)}
                        value={newMessageToSend}
                        type="text"
                        placeholder="Type in your message"
                        name="message"
                    />
                </div>
            </div>
            {/*  */}
            <AnimatePresence
                initial={false}
                onExitComplete={() => null}
                exitBeforeEnter={true}
            >
                {isGrpModalOpen && (
                    <LocalOverLay
                        bgColor="#000"
                        initial={{ translateX: '100%' }}
                        animate={{ translateX: '0%' }}
                        exit={{ translateX: '100%' }}
                    >
                        <GroupInfo setIsGrpModalOpen={setIsGrpModalOpen} />
                    </LocalOverLay>
                )}
            </AnimatePresence>
        </>
    )
}

export default SingleChat
