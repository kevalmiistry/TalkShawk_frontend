import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import S from './UserBadge.module.scss'

type TProp = {
    user: UserData
    handleFunction: () => void
}
const UserBadge: FC<TProp> = ({ user, handleFunction }) => {
    return (
        <>
            <div className={S.badge_main} onClick={handleFunction}>
                <>
                    <span>@{user.username}</span>
                    <FontAwesomeIcon icon={faClose} />
                </>
            </div>
        </>
    )
}

export default UserBadge
