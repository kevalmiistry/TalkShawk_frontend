import React, { FC, useState } from 'react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'
import ChatState from '../../Context/ChatContext'
import CropAndUpload from '../CropAndUpload/CropAndUpload'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import SearchBox from '../SearchBox/SearchBox'
import S from './CreateGroup.module.scss'
import axios from 'axios'
import UserItem from '../UserItem/UserItem'
import UserBadge from '../UserBadge/UserBadge'
import { useAutoAnimate } from '@formkit/auto-animate/react'

type TProp = {
    setIsGroupModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const CreateGroup: FC<TProp> = ({ setIsGroupModalOpen }) => {
    const [animationParent] = useAutoAnimate<HTMLUListElement>()

    const { user, setSelectedChat, setChats } = ChatState()

    const [chatName, setChatName] = useState<string>('')

    const [openModal, setOpenModal] = useState(false)
    const [pic, setPic] = useState<string | null>(null)

    const [search, setSearch] = useState('')
    const [isSearchOnFocus, setIsSearchOnFocus] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const [searchResults, setSearchResults] = useState([])
    const [selectedMembers, setSelectedMembers] = useState<UserData[]>([])
    const [selectedMembersIds, setSelectedMembersIds] = useState<string[]>([])

    const onSearch = async (query: string) => {
        try {
            if (query === '') {
                setSearchResults([])
            } else {
                setIsSearching(true)
                const url =
                    process.env.REACT_APP_API_URL + `/user/?search=${query}`
                const config = {
                    headers: { 'auth-token': user?.token },
                }
                const { data } = await axios.get(url, config)
                setSearchResults(data.users)
                setIsSearching(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const addToList = (u: UserData) => {
        if (!selectedMembersIds.includes(u._id)) {
            setSelectedMembers((prev) => [u, ...prev])
            setSelectedMembersIds((prev) => [u._id, ...prev])
        }
        setSearchResults([])
    }

    const removeFromList = (u: UserData) => {
        setSelectedMembers((prev) => prev?.filter((p) => p._id !== u._id))
        setSelectedMembersIds((prev) => prev?.filter((p) => p !== u._id))
    }

    const [isCreating, setIsCreating] = useState(false)
    const createGroupChat = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + '/chat/creategroup'
            const config = {
                headers: {
                    'auth-token': user?.token,
                },
            }
            const dataToSend = {
                name: chatName,
                users: selectedMembersIds,
                pic,
            }
            setIsCreating(true)
            const { data } = await axios.post(url, dataToSend, config)
            if (data) {
                setChats((prev) => [data, ...prev])
                setSelectedChat(data)
                setIsGroupModalOpen(false)
            }
            setIsCreating(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className={S.group_main}>
                <div className={S.head_wrapper}>
                    <h3>Create New Group</h3>
                    <FontAwesomeIcon
                        className={'pointer'}
                        icon={faClose}
                        onClick={() => setIsGroupModalOpen(false)}
                    />
                </div>
                <input
                    className={S.chatname_input}
                    type="text"
                    placeholder="Type in your group name"
                    name="chatName"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                />

                <div className={S.pic_wrapper}>
                    <button
                        className={`btn ${S.upload_btn}`}
                        onClick={() => setOpenModal(true)}
                    >
                        Group Pic?
                    </button>
                    {pic && <img src={pic} alt="group pic preview" />}
                </div>
                {/*  */}
                <ul ref={animationParent} className={S.selected_list}>
                    {selectedMembers?.map((u) => (
                        <UserBadge
                            key={u._id}
                            user={u}
                            handleFunction={() => removeFromList(u)}
                        />
                    ))}
                </ul>
                {/*  */}
                <div className={S.search_wrapper}>
                    <SearchBox
                        search={search}
                        setSearch={setSearch}
                        isSearchOnFocus={isSearchOnFocus}
                        setIsSearchOnFocus={setIsSearchOnFocus}
                        isSearching={isSearching}
                        onSearch={onSearch}
                    />
                    <ul className={S.list} ref={animationParent}>
                        {searchResults.map((u: UserData) => (
                            <UserItem
                                key={u._id}
                                user={u}
                                handleFunction={() => addToList(u)}
                            />
                        ))}
                    </ul>
                </div>
                {/*  */}
                <AnimatePresence
                    initial={false}
                    onExitComplete={() => null}
                    exitBeforeEnter={true}
                >
                    {openModal && (
                        <ModalOverlay>
                            <CropAndUpload
                                setOpenModal={setOpenModal}
                                setPic={setPic}
                            />
                        </ModalOverlay>
                    )}
                </AnimatePresence>
                <div className={S.create_btn}>
                    <button
                        disabled={
                            chatName.length < 1 || selectedMembersIds.length < 2
                        }
                        className={`btn ${
                            chatName.length < 1 || selectedMembersIds.length < 2
                                ? ' disable'
                                : ''
                        }`}
                        onClick={createGroupChat}
                    >
                        {isCreating ? 'Creating...' : 'Create Group'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateGroup
