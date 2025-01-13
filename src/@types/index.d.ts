declare interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
  pic: string;
  token: string;
}
declare type TMessageSender = {
  _id: string;
  pic: string;
  name: string;
  username: string;
};
declare type TMessage = {
  _id: string;
  sender: TMessageSender;
  content: string;
  chat: SingleChatData;
};
declare interface SingleChatData {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  groupPic: string;
  users: UserData[];
  groupAdmins: UserData[];
  latestMessage?: TMessage;
}
