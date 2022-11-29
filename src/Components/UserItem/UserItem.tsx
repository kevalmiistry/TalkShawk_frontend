import React from 'react'
import S from './UserItem.module.scss'

type TProp = {
    user: UserData
}
const UserItem: React.FC<TProp> = ({ user }) => {
    return (
        <li className={S.useritem} onClick={() => null}>
            <img src={user.pic} alt="" />
            <div>
                <p className={S.name}>{user.name}</p>
                <p className={S.username}>@{user.username}</p>
            </div>
        </li>
    )
}

export default UserItem
