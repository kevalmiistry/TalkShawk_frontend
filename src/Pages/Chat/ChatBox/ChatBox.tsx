import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";
import SingleChat from "./SingleChat/SingleChat";
import ChatSVG from "./ChatSVG";
import S from "./ChatBox.module.scss";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const ChatBox: FC = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0%" }}
      transition={{ duration: 0.1 }}
      exit={{ translateX: "100%" }}
      className={S.chatbox_main}
    >
      <AnimatePresence mode="wait">
        {!selectedChat && (
          <motion.div
            className={S.svg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <ChatSVG />
            </div>
            <p>Click any of the chat to start conversation!</p>
          </motion.div>
        )}
        {/*  */}
        {selectedChat ? <SingleChat /> : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatBox;
