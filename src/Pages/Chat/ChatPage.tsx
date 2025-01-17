import { AnimatePresence } from "framer-motion";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import ChatState from "../../Context/ChatContext";
import ChatList from "./ChatList/ChatList";
import ChatBox from "./ChatBox/ChatBox";
import S from "./ChatPage.module.scss";

const ChatPage: FC = () => {
  document.title = "TalkShawk | Chats";
  const { user, setUser, selectedChat } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("talkshawk_user")!);
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    } else {
      navigate("/chat");
    }
  }, [navigate]);

  return user ? (
    <div className={S.chat_page_main}>
      <ChatList />

      {isMobile ? (
        <AnimatePresence mode="wait">
          {selectedChat ? <ChatBox /> : null}
        </AnimatePresence>
      ) : (
        <ChatBox />
      )}
    </div>
  ) : null;
};

export default ChatPage;
