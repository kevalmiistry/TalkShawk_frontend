import { FC, useState, useEffect, FormEvent } from "react";
import { faCaretRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { getOppositeUser } from "../../../../ChatLogics/ChatLogics";
import GroupInfo from "../../../../Components/GroupInfo/GroupInfo";
import LocalOverLay from "../../../../Components/LocalOverLay/LocalOverLay";
import ChatState from "../../../../Context/ChatContext";
import thin_spinner from "../../../../Assets/thin_spinner.gif";
import { ToastState } from "../../../../Context/ToastContext";
import ScrollableChat from "./ScrollableChat/ScrollableChat";
import S from "./SingleChat.module.scss";
import axios, { CancelToken } from "axios";
import io, { Socket } from "socket.io-client";

let socket: Socket, selectedChatCompare: SingleChatData | null;
type TProp = {};
const SingleChat: FC<TProp> = () => {
  const { user, selectedChat, setSelectedChat, isSocketConnected } =
    ChatState();

  const { showToast } = ToastState();

  const [isGrpModalOpen, setIsGrpModalOpen] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [newMessageToSend, setNewMessageToSend] = useState("");

  const [typing, setTyping] = useState(false);
  const [isSomeOneTyping, setIsSomeOneTyping] = useState(false);
  const [typersPic, setTypersPic] = useState("");

  let name: string = "";
  let pic: string = "";
  if (selectedChat && user) {
    name = selectedChat.isGroupChat
      ? selectedChat.chatName
      : getOppositeUser(selectedChat.users, user).name;

    pic = selectedChat.isGroupChat
      ? selectedChat.groupPic
      : getOppositeUser(selectedChat.users, user).pic;
  }

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (newMessageToSend.trim().length === 0) return;

      setIsSending(true);
      const url = import.meta.env.VITE_APP_API_URL + `/message/create`;
      const config = { headers: { "auth-token": user?.token } };
      const dataToSend = {
        chatId: selectedChat?._id,
        content: newMessageToSend,
      };
      const { data } = await axios.post(url, dataToSend, config);
      setNewMessageToSend("");
      socket.emit("newMessage", data);
      setMessages((prev: TMessage[]) => [...prev, data]);
      setIsSending(false);
    } catch (error) {
      setIsSending(false);
      showToast({
        message: "Something went wrong!",
        show: true,
        status: "error",
      });
    }
  };

  // useEffect to establish connection with socket
  useEffect(() => {
    if (!isSocketConnected) return console.error("Socket is not connected");

    if (!import.meta.env.VITE_APP_API_ENDPOINT)
      return console.error("ENDPOINT NOT AVAILABLE");

    socket = io(import.meta.env.VITE_APP_API_ENDPOINT);
    socket.emit("joinChat", selectedChat?._id);
    socket.on("typing", (pic) => {
      setIsSomeOneTyping(true);
      setTypersPic(pic);
    });
    socket.on("stopTyping", () => setIsSomeOneTyping(false));
  }, []);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageToSend(e.target.value);

    // Typing indicator logic
    if (!isSocketConnected) {
      console.log("Socket no connect!");
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id, user?.pic);
    }

    if (e.target.value === "") {
      setTyping(false);
      socket.emit("stopTyping", selectedChat?._id);
    }

    let lastTypingTime = new Date().getTime();
    let timeLength = 2000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timeLength && typing) {
        socket.emit("stopTyping", selectedChat?._id);
      }
      setTyping(false);
    }, timeLength);
  };

  const fetchMessages = async (token: CancelToken) => {
    try {
      setIsMessagesLoading(true);
      const url =
        import.meta.env.VITE_APP_API_URL + `/message/${selectedChat?._id}`;

      const { data } = await axios.get(url, {
        headers: { "auth-token": user?.token },
        cancelToken: token,
      });
      setMessages(data);
      setIsMessagesLoading(false);
      socket.emit("joinChat", selectedChat?._id);
    } catch (error) {
      showToast({
        message: "Something went wrong!",
        show: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchReq = axios.CancelToken.source();
    fetchMessages(fetchReq.token);
    selectedChatCompare = selectedChat;

    return () => fetchReq.cancel();
  }, [selectedChat]);

  useEffect(() => {
    socket.on("messageReceived", (newMessageRecieved: TMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageRecieved.chat._id
      ) {
        // do nothing
      } else {
        setMessages((prev) => [...prev, newMessageRecieved]);
      }
    });
  }, []);

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
              onClick={() => {
                selectedChat?.isGroupChat && setIsGrpModalOpen(true);
              }}
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
                <img src={thin_spinner} className={S.loading_img} alt="" />
              </div>
            ) : (
              <ScrollableChat
                isSomeOneTyping={isSomeOneTyping}
                typersPic={typersPic}
                messages={messages}
              />
            )}
          </div>
        </div>

        {/*  */}

        <div className={S.type_field}>
          <form onSubmit={handleSendMessage} className={S.msg_input_wrapper}>
            <input
              onChange={handleTyping}
              value={newMessageToSend}
              type="text"
              placeholder="Type in your message"
              name="message"
              disabled={isSending}
            />
            <button className={`btn ${S.send_btn}`} disabled={isSending}>
              Send
            </button>
          </form>
        </div>
      </div>

      {/*  */}

      <AnimatePresence mode="wait">
        {isGrpModalOpen && (
          <LocalOverLay
            bgColor="#000"
            initial={{ translateX: "100%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "100%" }}
          >
            <GroupInfo setIsGrpModalOpen={setIsGrpModalOpen} />
          </LocalOverLay>
        )}
      </AnimatePresence>
    </>
  );
};

export default SingleChat;
