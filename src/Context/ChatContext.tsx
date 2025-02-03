import React, { createContext, useContext, useState } from "react";

type TChatContext = {
  chats: SingleChatData[];
  setChats: React.Dispatch<React.SetStateAction<SingleChatData[]>>;
  fetchChatsAgain: boolean;
  setFetchChatsAgain: React.Dispatch<React.SetStateAction<boolean>>;
  isSocketConnected: boolean;
  setIsSocketConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatContext = createContext<TChatContext>({} as TChatContext);

type TProp = {
  children: React.ReactNode;
};
export const ChatProvider: React.FC<TProp> = ({ children }) => {
  const [chats, setChats] = useState<SingleChatData[]>([]);
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  return (
    <>
      <ChatContext.Provider
        value={{
          chats,
          setChats,
          fetchChatsAgain,
          setFetchChatsAgain,
          isSocketConnected,
          setIsSocketConnected,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};

export default function ChatState() {
  return useContext(ChatContext);
}
