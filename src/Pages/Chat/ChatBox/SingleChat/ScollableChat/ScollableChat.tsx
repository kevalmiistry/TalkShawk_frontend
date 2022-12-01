import { FC, useRef, useEffect } from 'react'
import S from './ScollableChat.module.scss'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Message from './Message/Message'
type TProp = {
    messages: TMessage[]
}
const ScollableChat: FC<TProp> = ({ messages }) => {
    const [animationParent] = useAutoAnimate<HTMLUListElement>()
    const messageEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messageEndRef.current?.scrollIntoView()
    }, [messages])

    return (
        <>
            <ul className={S.scollable_main} ref={animationParent}>
                {messages?.map((m, i) => (
                    <Message key={m._id} messages={messages} m={m} i={i} />
                ))}
                <div ref={messageEndRef} />
            </ul>
        </>
    )
}

export default ScollableChat
