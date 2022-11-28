export const getOppositeUser = (users: UserData[], loggedUser: UserData) => {
    if (users[0]._id === loggedUser._id) {
        return users[1]
    } else {
        return users[0]
    }
}
