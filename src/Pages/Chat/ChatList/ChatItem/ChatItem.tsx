import React from "react";
import { getOppositeUser } from "../../../../ChatLogics/ChatLogics";
import ChatState from "../../../../Context/ChatContext";
import S from "./ChatItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { chatActions } from "../../../../store/chat/chatSlice";

type TProp = {
  chat: SingleChatData;
};

const ChatItem: React.FC<TProp> = ({ chat }) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch<AppDispatch>();

  const name = chat.isGroupChat
    ? chat.chatName
    : getOppositeUser(chat.users, user!)?.name;

  const pic = chat.isGroupChat
    ? chat.groupPic
    : getOppositeUser(chat.users, user!)?.pic;

  return (
    <li
      className={S.chatitem}
      onClick={() => dispatch(chatActions.setSelectedChat(chat))}
    >
      <img src={pic} alt="chat profile pic" />
      <div>
        <p className={S.name}>{name}</p>
        <p className={S.latest_msg}>
          {chat?.latestMessage ? (
            chat?.latestMessage.content.length > 35 ? (
              chat?.latestMessage.content.substring(0, 34) + "..."
            ) : (
              chat?.latestMessage.content
            )
          ) : (
            <span>No latest Message!</span>
          )}
        </p>
      </div>
    </li>
  );
};

export default ChatItem;
