import React from 'react'
import ChatState from '../../Context/ChatContext'
import S from './Nav.module.scss'
import talkshawk_logo from '../../Assets/talkshawk_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
const Nav: React.FC = () => {
    const { user } = ChatState()
    return (
        <div className={S.nav_main}>
            <img
                title="Profile"
                className={S.user_profile}
                src={user?.pic}
                alt="user profile pic"
            />
            <img className={S.logo} src={talkshawk_logo} alt="" />
            <div title="Create Group">
                <FontAwesomeIcon icon={faUserGroup} />
            </div>
        </div>
    )
}

export default Nav
