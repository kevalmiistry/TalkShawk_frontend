declare interface UserData {
    _id: string
    name: string
    username: string
    email: string
    pic: string
    token: string
}
type TLatestMessageSender = {
    _id: string
    pic: string
    name: string
    email: string
    username: string
}
type TLatestMessage = {
    _id: string
    sender: TLatestMessageSender
    content: string
    chat: string
}
declare interface SingleChatData {
    _id: string
    chatName: string
    isGroupChat: boolean
    users: UserData[]
    groupAdmins: UserData[]
    latestMessage?: TLatestMessage
}
