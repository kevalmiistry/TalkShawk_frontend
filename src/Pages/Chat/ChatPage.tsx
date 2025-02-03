import { AnimatePresence } from "framer-motion";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import ChatList from "./ChatList/ChatList";
import ChatBox from "./ChatBox/ChatBox";
import S from "./ChatPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { userSliceActions } from "../../store/user/userSlice";

const ChatPage: FC = () => {
  document.title = "TalkShawk | Chats";
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.value);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo: UserData | null = JSON.parse(
      localStorage.getItem("talkshawk_user")!
    );

    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(userSliceActions.setUser(userInfo));
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
