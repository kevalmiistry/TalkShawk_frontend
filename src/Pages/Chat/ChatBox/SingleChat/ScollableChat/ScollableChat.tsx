import { FC } from 'react'
import S from './ScollableChat.module.scss'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Message from './Message/Message'
import ScrollableFeed from 'react-scrollable-feed'

type TProp = {
    messages: TMessage[]
}
const ScollableChat: FC<TProp> = ({ messages }) => {
    const [animationParent] = useAutoAnimate<HTMLUListElement>()

    return (
        <>
            <ul className={S.scollable_main}>
                <ScrollableFeed>
                    {messages?.map((m, i) => (
                        <Message key={m._id} messages={messages} m={m} i={i} />
                    ))}
                </ScrollableFeed>
            </ul>
        </>
    )
}

export default ScollableChat
