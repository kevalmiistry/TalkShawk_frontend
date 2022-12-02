import React, { useState } from 'react'
import ChatState from '../../Context/ChatContext'
import S from './Nav.module.scss'
import talkshawk_logo from '../../Assets/TalkShawk_Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import Profile from '../Profile/Profile'
import CreateGroup from '../CreateGroup/CreateGroup'

const Nav: React.FC = () => {
    const { user, setFetchChatsAgain } = ChatState()
    const [menuOpen, setMenuOpen] = useState(false)

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)

    const nev = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem('talkshawk_user')
        nev('/')
    }
    return (
        <div
            className={S.nav_main}
            onClick={() => {
                if (menuOpen) setMenuOpen(false)
            }}
        >
            <div className={S.user_profile}>
                <img
                    title="Profile"
                    className={S.user_pic}
                    src={user?.pic}
                    alt="user profile pic"
                    onClick={() => setMenuOpen((p) => !p)}
                />
                <AnimatePresence
                    initial={false}
                    onExitComplete={() => null}
                    exitBeforeEnter={true}
                >
                    {menuOpen && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, transformOrigin: 'top left' }}
                            exit={{ scale: 0 }}
                            className={S.menu}
                        >
                            <ul>
                                <li onClick={() => setIsProfileModalOpen(true)}>
                                    Profile
                                </li>
                                <li onClick={handleLogOut}>Logout</li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <img
                className={S.logo}
                src={talkshawk_logo}
                alt="TalkShawk Logo"
                onClick={() => setFetchChatsAgain((p) => !p)}
            />

            <div title="Create Group">
                <FontAwesomeIcon
                    className={S.group_icon}
                    icon={faUserGroup}
                    onClick={() => setIsGroupModalOpen(true)}
                />
            </div>
            <AnimatePresence
                initial={false}
                onExitComplete={() => null}
                exitBeforeEnter={true}
            >
                {isProfileModalOpen && (
                    <ModalOverlay
                        initial={{ translateY: '-100%' }}
                        animate={{ translateY: '0%' }}
                        exit={{ translateY: '-100%' }}
                    >
                        <Profile
                            setIsProfileModalOpen={setIsProfileModalOpen}
                        />
                    </ModalOverlay>
                )}
            </AnimatePresence>
            {/*  */}
            <AnimatePresence
                initial={false}
                onExitComplete={() => null}
                exitBeforeEnter={true}
            >
                {isGroupModalOpen && (
                    <ModalOverlay
                        initial={{ scale: 0, transformOrigin: 'top right' }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, transformOrigin: 'top right' }}
                    >
                        <CreateGroup
                            setIsGroupModalOpen={setIsGroupModalOpen}
                        />
                    </ModalOverlay>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Nav
