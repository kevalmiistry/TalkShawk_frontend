import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, FC } from "react";
import Nav from "../../../Components/Nav/Nav";
import SearchBox from "../../../Components/SearchBox/SearchBox";
import SearchUserList from "../../../Components/SearchUserList/SearchUserList";
import UserSkeleton from "../../../Components/UserSkeleton/UserSkeleton";
import ChatState from "../../../Context/ChatContext";
import ChatItem from "./ChatItem/ChatItem";
import S from "./ChatList.module.scss";
import io, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { chatActions } from "../../../store/chat/chatSlice";

let socket: Socket;

const ChatList: FC = () => {
  const [search, setSearch] = useState("");
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isChatsFetching, setIsChatsFetching] = useState(false);

  const user = useSelector((state: RootState) => state.user.value);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const chats = useSelector((state: RootState) => state.chat.chats);
  const fetchChatsAgain = useSelector(
    (state: RootState) => state.chat.fetchChatsAgain
  );

  const dispatch = useDispatch<AppDispatch>();

  const { setIsSocketConnected } = ChatState();

  useEffect(() => {
    if (user) {
      if (!import.meta.env.VITE_APP_API_ENDPOINT)
        return console.error("ENDPOINT NOT AVAILABLE");

      socket = io(import.meta.env.VITE_APP_API_ENDPOINT);
      socket.emit("online", user);
      socket.on("__online__", () => setIsSocketConnected(true));
    }
  }, [user]);

  useEffect(() => {
    socket.on(
      "commonMessageReceived",
      (newMessage: TMessage, userID: string) => {
        if (userID !== user?._id) return;

        if (selectedChat?._id !== newMessage.chat._id) {
          dispatch(chatActions.setFetchChatsAgain((p) => !p));
        }
      }
    );
  }, []);

  const onSearch = async (query: string) => {
    if (query === "") {
      setSearchResults([]);
    } else {
      setIsSearching(true);
      const url = import.meta.env.VITE_APP_API_URL + `/user/?search=${query}`;
      const config = {
        headers: { "auth-token": user?.token },
      };
      const { data } = await axios.get(url, config);
      setSearchResults(data.users);
      setIsSearching(false);
    }
  };

  const fetchChats = async () => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + "/chat/fetch";
      const config = {
        headers: { "auth-token": user?.token },
      };
      setIsChatsFetching(true);
      const { data } = await axios.get(url, config);
      dispatch(chatActions.setChats(data));
      setIsChatsFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearchResults([]);
    }
  }, [search]);

  useEffect(() => {
    fetchChats();
  }, [fetchChatsAgain]);

  return (
    <div className={S.main_chat_list}>
      <Nav />

      <SearchBox
        search={search}
        setSearch={setSearch}
        isSearchOnFocus={isSearchOnFocus}
        setIsSearchOnFocus={setIsSearchOnFocus}
        onSearch={onSearch}
        isSearching={isSearching}
      />

      <div
        className={S.list}
        style={{ overflow: isSearchOnFocus ? "hidden" : "auto" }}
      >
        {isChatsFetching ? (
          chats.length > 0 ? (
            chats.map((c) => <ChatItem key={c._id} chat={c} />)
          ) : (
            <UserSkeleton />
          )
        ) : (
          chats.map((c) => <ChatItem key={c._id} chat={c} />)
        )}

        <AnimatePresence mode="wait">
          {isSearchOnFocus ? (
            <SearchUserList searchResults={searchResults} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatList;
