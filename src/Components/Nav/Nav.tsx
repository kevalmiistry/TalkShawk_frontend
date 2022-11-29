import React from 'react'
import ChatState from '../../Context/ChatContext'
import S from './Nav.module.scss'
import talkshawk_logo from '../../Assets/talkshawk_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import Profile from '../Profile/Profile'

const Nav: React.FC = () => {
    const { user } = ChatState()
    const [menuOpen, setMenuOpen] = React.useState(false)

    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)

    const nev = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem('talkshawk_user')
        nev('/')
    }
    return (
        <div
            className={S.nav_main}
            onClick={() => {
                if (menuOpen) {
                    setMenuOpen(false)
                }
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
            <img className={S.logo} src={talkshawk_logo} alt="" />
            <div title="Create Group">
                <FontAwesomeIcon icon={faUserGroup} />
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
        </div>
    )
}

export default Nav
