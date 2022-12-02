export const getOppositeUser = (users: UserData[], loggedUser: UserData) => {
    if (users[0]._id === loggedUser._id) {
        return users[1]
    } else {
        return users[0]
    }
}

export const showAvatar = (
    messages: TMessage[],
    m: TMessage,
    i: number,
    user: UserData
): boolean => {
    if (
        m?.sender?._id !== user?._id &&
        (messages[i + 1]?.sender?._id !== m?.sender._id || !messages[i + 1])
    ) {
        return true
    } else {
        return false
    }
}
