import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  selectedChat: SingleChatData | null;
  chats: SingleChatData[];
  fetchChatsAgain: boolean;
  isSocketConnected: boolean;
}

const initialState: ChatState = {
  chats: [],
  fetchChatsAgain: false,
  isSocketConnected: false,
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (
      state,
      action: PayloadAction<
        | ChatState["selectedChat"]
        | ((prev: ChatState["selectedChat"]) => ChatState["selectedChat"])
      >
    ) => {
      state.selectedChat =
        typeof action.payload === "function"
          ? action.payload(state.selectedChat)
          : action.payload;
    },
    setChats: (
      state,
      action: PayloadAction<
        ChatState["chats"] | ((prev: ChatState["chats"]) => ChatState["chats"])
      >
    ) => {
      state.chats =
        typeof action.payload === "function"
          ? action.payload(state.chats)
          : action.payload;
    },
    setFetchChatsAgain: (
      state,
      action: PayloadAction<
        | ChatState["fetchChatsAgain"]
        | ((prev: ChatState["fetchChatsAgain"]) => ChatState["fetchChatsAgain"])
      >
    ) => {
      state.fetchChatsAgain =
        typeof action.payload === "function"
          ? action.payload(state.fetchChatsAgain)
          : action.payload;
    },
    setIsSocketConnected: (
      state,
      action: PayloadAction<
        | ChatState["isSocketConnected"]
        | ((
            prev: ChatState["isSocketConnected"]
          ) => ChatState["isSocketConnected"])
      >
    ) => {
      state.isSocketConnected =
        typeof action.payload === "function"
          ? action.payload(state.isSocketConnected)
          : action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
