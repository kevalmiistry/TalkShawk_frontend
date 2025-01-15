import { FC } from "react";
import S from "./ScrollableChat.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Message from "./Message/Message";
import ScrollableFeed from "react-scrollable-feed";
import typing_dots from "../../../../../Assets/typing_dots.gif";

type TProp = {
  messages: TMessage[];
  isSomeOneTyping: boolean;
  typersPic: string;
};
const ScollableChat: FC<TProp> = ({ messages, isSomeOneTyping, typersPic }) => {
  const [animationParent] = useAutoAnimate<HTMLUListElement>();

  return (
    <>
      <ul className={S.scollable_main} ref={animationParent}>
        <ScrollableFeed>
          {messages?.map((m, i) => (
            <Message key={m._id} messages={messages} m={m} i={i} />
          ))}
          {isSomeOneTyping && (
            <>
              <div className={S.typing_wrapper}>
                <img className={S.typers_pic} src={typersPic} alt="user:" />
                <img src={typing_dots} className={S.typing_dots} alt="Typing" />
              </div>
            </>
          )}
        </ScrollableFeed>
      </ul>
    </>
  );
};

export default ScollableChat;
