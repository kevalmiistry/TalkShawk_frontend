import React, { createContext, useContext, useState } from "react";

type TChatContext = {
  isSocketConnected: boolean;
  setIsSocketConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatContext = createContext<TChatContext>({} as TChatContext);

type TProp = {
  children: React.ReactNode;
};
export const ChatProvider: React.FC<TProp> = ({ children }) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  return (
    <>
      <ChatContext.Provider
        value={{
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
